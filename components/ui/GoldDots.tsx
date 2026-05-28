export default function GoldDots({ my = '32px' }: { my?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', margin: `${my} auto` }}>
      <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#C9A84C', boxShadow: '0 0 8px rgba(201,168,76,0.45)' }} />
      <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#C9A84C', boxShadow: '0 0 6px rgba(201,168,76,0.3)' }} />
      <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#C9A84C', boxShadow: '0 0 8px rgba(201,168,76,0.45)' }} />
    </div>
  );
}
