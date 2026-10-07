/** Grain animé très léger + grille 12 colonnes en filigrane. */
export function Overlays() {
  return (
    <>
      <div className="grid-overlay" aria-hidden="true">
        <div className="container-x">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  )
}
