import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import logoIcon from '../../images/favicon.ico';

const libraryItems = ['Header block', 'Link stack', 'Featured card', 'Embed block', 'Contact row'];

function SortableTile({ id, label, type, active, onSelect }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`sortable-card ${active ? 'active' : ''}`}
      onClick={onSelect}
    >
      <strong>{label}</strong>
      <span>{type}</span>
    </button>
  );
}

function DashboardPage() {
  const [cards, setCards] = useState([
    { id: 'hero', label: 'Profile Header', type: 'header', url: 'https://findme.link' },
    { id: 'links', label: 'Primary Links', type: 'stack', url: 'https://example.com' },
    { id: 'feature', label: 'Featured Content', type: 'feature', url: 'https://example.com/story' },
    { id: 'social', label: 'Social Grid', type: 'social', url: 'https://instagram.com' }
  ]);
  const [selectedId, setSelectedId] = useState('hero');

  useEffect(() => {
    document.title = 'Findme Dashboard';
  }, []);

  const selected = useMemo(() => cards.find((c) => c.id === selectedId), [cards, selectedId]);

  function updateSelected(key, value) {
    setCards((items) => items.map((item) => (item.id === selectedId ? { ...item, [key]: value } : item)));
  }

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
    <main className="dashboard-page">
      <div className="site-container dash-shell">
        <header className="dash-header">
          <div className="dash-identity">
            <img src={logoIcon} alt="Findme icon" />
            <div>
              <strong>Findme Studio</strong>
              <span>@niloy</span>
            </div>
          </div>
          <div className="dash-actions">
            <Link to="/niloy" className="pill-btn ghost">View live</Link>
            <button className="pill-btn primary">Save changes</button>
          </div>
        </header>

        <div className="dash-columns">
          <aside className="dash-panel">
            <h3 className="panel-title">Library</h3>
            <div className="library-list">
              {libraryItems.map((item) => (
                <p key={item} className="library-item">{item}</p>
              ))}
            </div>
          </aside>

          <section className="dash-panel preview-stage">
            <h3 className="panel-title">Live preview order</h3>
            <p className="panel-subtitle">Drag cards to reorder your public profile flow.</p>

            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                <div className="preview-list">
                  {cards.map((card) => (
                    <SortableTile
                      key={card.id}
                      id={card.id}
                      label={card.label}
                      type={card.type}
                      active={selectedId === card.id}
                      onSelect={() => setSelectedId(card.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </section>

          <aside className="dash-panel">
            <h3 className="panel-title">Inspector</h3>
            <label className="inspector-field">
              <span>Label</span>
              <input value={selected?.label || ''} onChange={(e) => updateSelected('label', e.target.value)} />
            </label>
            <label className="inspector-field">
              <span>URL</span>
              <input value={selected?.url || ''} onChange={(e) => updateSelected('url', e.target.value)} />
            </label>
            <label className="inspector-field">
              <span>Type</span>
              <select value={selected?.type || 'stack'} onChange={(e) => updateSelected('type', e.target.value)}>
                <option value="header">Header</option>
                <option value="stack">Stack</option>
                <option value="feature">Feature</option>
                <option value="social">Social</option>
              </select>
            </label>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
