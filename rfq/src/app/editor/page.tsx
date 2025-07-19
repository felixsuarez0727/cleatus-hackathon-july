'use client';
import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Loader2, GripVertical, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Block {
    id: string;
    type: 'H1' | 'H2' | 'H3' | 'Text' | 'Form';
    content?: string;
    fields?: { label: string; name: string; type: string; value?: string }[];
}

function SortableItem({
    block,
    onUpdate,
}: {
    block: Block;
    onUpdate: (b: Block) => void;
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgb(0 0 0 / 0.1)',
        marginBottom: '1rem',
        border: '1px solid #ddd',
        willChange: 'transform',
    };

    const handleChange = (val: string, key: 'content' | 'fields', fIndex?: number) => {
        const updated = { ...block } as any;
        if (key === 'content') updated.content = val;
        if (key === 'fields' && typeof fIndex === 'number') {
            updated.fields![fIndex].value = val;
        }
        onUpdate(updated);
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [block.content]);

    return (
        <div ref={setNodeRef} style={style}>
            {/* Drag handle */}
            <button
                {...attributes}
                {...listeners}
                className="cursor-move select-none p-2 text-gray-500 hover:text-gray-700"
                aria-label="Drag handle"
                type="button"
                style={{ background: 'transparent', border: 'none' }}
                onClick={e => e.preventDefault()}
            >
                <GripVertical size={20} />
            </button>

            {/* Editable content */}
            <div className="flex-grow">
                <span className="text-xs text-gray-500">{block.type}</span>
                {block.type.startsWith('H') ? (
                    <input
                        type="text"
                        value={block.content}
                        onChange={e => handleChange(e.target.value, 'content')}
                        className={`w-full font-semibold ${
                            block.type === 'H1' ? 'text-2xl' :
                            block.type === 'H2' ? 'text-xl' : 'text-lg'
                        } border-b focus:outline-none`}
                    />
                ) : block.type === 'Text' ? (
                    <textarea
                        ref={textareaRef}
                        value={block.content}
                        onChange={e => handleChange(e.target.value, 'content')}
                        className="w-full border rounded p-2 resize-none overflow-hidden"
                        rows={1}
                        style={{ minHeight: 40 }}
                    />
                ) : block.type === 'Form' ? (
                    <div className="space-y-2 mt-2">
                        {block.fields?.map((f, i) => (
                            <div key={f.name} className="flex flex-col">
                                <label className="text-sm text-gray-600">{f.label}</label>
                                <input
                                    type={f.type}
                                    value={f.value || ''}
                                    onChange={e => handleChange(e.target.value, 'fields', i)}
                                    className="border rounded px-2 py-1 focus:outline-none"
                                />
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default function EditorPage() {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const router = useRouter();
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    useEffect(() => {
        if (isPreviewOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isPreviewOpen]);

    useEffect(() => {
        fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{}',
        })
            .then(res => res.json())
            .then(data => {
                const parsed = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
                setBlocks(
                    parsed.blocks.map((b: any, i: number) => ({
                        id: `${b.type}-${i}-${Date.now()}`,
                        type: b.type,
                        content: b.content,
                        fields: b.fields?.map((f: any) => ({ ...f, value: '' })),
                    }))
                );
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const updateBlock = (updated: Block) => {
        setBlocks(bs => bs.map(b => (b.id === updated.id ? updated : b)));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => router.back()}
                        className="text-gray-600 hover:text-gray-900 flex items-center"
                    >
                        <ArrowLeft size={20} className="mr-2" /> Back
                    </button>

                    <button
                        onClick={() => setIsPreviewOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Full Preview
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin" size={30} />
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={({ active, over }) => {
                            if (over && active.id !== over.id) {
                                const oldIdx = blocks.findIndex(b => b.id === active.id);
                                const newIdx = blocks.findIndex(b => b.id === over.id);
                                setBlocks(bs => arrayMove(bs, oldIdx, newIdx));
                            }
                        }}
                    >
                        <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                            {blocks.map(b => (
                                <SortableItem key={b.id} block={b} onUpdate={updateBlock} />
                            ))}
                        </SortableContext>
                    </DndContext>
                )}
            </div>

            {/* Modal Preview */}
            {isPreviewOpen && (
                <div
                    className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-start overflow-auto z-50 p-6"
                    onClick={() => setIsPreviewOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg max-w-3xl w-full mt-10 p-16 relative max-h-[80vh] overflow-auto"
                        onClick={e => e.stopPropagation()}
                        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
                    >
                        <button
                            onClick={() => setIsPreviewOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                            aria-label="Cerrar preview"
                        >
                            <X size={24} />
                        </button>
                        <div className="space-y-6">
                            {blocks.map(b => {
                                if (b.type === 'H1')
                                    return (
                                        <h1 key={b.id} className="text-3xl font-bold">
                                            {b.content}
                                        </h1>
                                    );
                                if (b.type === 'H2')
                                    return (
                                        <h2 key={b.id} className="text-2xl font-semibold">
                                            {b.content}
                                        </h2>
                                    );
                                if (b.type === 'H3')
                                    return (
                                        <h3 key={b.id} className="text-xl font-semibold">
                                            {b.content}
                                        </h3>
                                    );
                                if (b.type === 'Text')
                                    return (
                                        <p key={b.id} className="text-base whitespace-pre-line">
                                            {b.content}
                                        </p>
                                    );
                                if (b.type === 'Form')
                                    return (
                                        <div key={b.id} className="space-y-2 border p-4 rounded bg-gray-50">
                                            {b.fields?.map(f => (
                                                <div key={f.name}>
                                                    <strong>{f.label}: </strong>
                                                    <span>{f.value || <em>N/A</em>}</span>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
