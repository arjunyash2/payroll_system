export default function Loading() {
  return (
    <div className="loading-layout" aria-label="Loading workspace" aria-busy="true">
      <div className="loading-sidebar" />
      <div className="loading-main">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-subtitle" />
        <div className="loading-stats">
          <div className="skeleton skeleton-panel" />
          <div className="skeleton skeleton-panel" />
          <div className="skeleton skeleton-panel" />
          <div className="skeleton skeleton-panel" />
        </div>
        <div className="skeleton skeleton-content" />
      </div>
    </div>
  );
}
