import { useEffect, useMemo, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableTile({ id, label, active, onSelect }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <button ref={setNodeRef} style={style} {...attributes} {...listeners} className={`canvas-tile ${active ? 'active' : ''}`} onClick={onSelect}>
      {label}
    </button>
  );
}

function DashboardPage() {
  const [cards, setCards] = useState([
    { id: 'instagram', label: 'Instagram Card' },
    { id: 'portfolio', label: 'Featured Project' },
    { id: 'contact', label: 'Contact Card' },
    { id: 'stats', label: 'Stats Card' }
  ]);
  const [selectedId, setSelectedId] = useState('instagram');

  useEffect(() => {
    document.title = 'Findme Dashboard';
  }, []);

  const selected = useMemo(() => cards.find((c) => c.id === selectedId), [cards, selectedId]);

  function onDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setCards((items) => {
      const oldIndex = items.findIndex((x) => x.id === active.id);
      const newIndex = items.findIndex((x) => x.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  return (
    <main className="dashboard-wrap">
      <header className="dash-top">
        <div className="dash-user"><div className="avatar sm">N</div><span>@niloy</span></div>
        <div className="dash-actions"><button className="btn btn-ghost">View live</button><button className="btn btn-primary">Save</button></div>
      </header>

      <div className="dash-grid">
        <aside className="panel"><h3>Card Palette</h3><p>Platform</p><p>Featured</p><p>Quote</p><p>Contact</p></aside>
        <section className="panel canvas">
          <h3>Live Preview</h3>
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={cards.map((c) => c.id)} strategy={horizontalListSortingStrategy}>
              <div className="canvas-list">
                {cards.map((card) => (
                  <SortableTile
                    key={card.id}
                    id={card.id}
                    label={card.label}
                    active={selectedId === card.id}
                    onSelect={() => setSelectedId(card.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </section>
        <aside className="panel">
          <h3>Properties</h3>
          <label className="field"><span>Label</span><input value={selected?.label || ''} readOnly /></label>
          <label className="field"><span>Link</span><input value="https://" readOnly /></label>
          <label className="field"><span>Size</span><select><option>S</option><option>M</option><option>L</option></select></label>
        </aside>
      </div>
    </main>
  );
}

export default DashboardPage;
