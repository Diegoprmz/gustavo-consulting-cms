'use client';

export default function DownloadPdfButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-shimmer font-sans font-semibold text-white no-print"
      style={{
        padding: '12px 26px',
        borderRadius: '8px',
        fontSize: '12px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        border: 0,
      }}
    >
      Descargar PDF
    </button>
  );
}
