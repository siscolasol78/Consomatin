const { useState } = React;

function App() {
  const [consommations, setConsommations] = useState({
    cafe: 0,
    chocolat: 0,
    creme: 0,
    noisette: 0,
    jusOrange: 0,
  });

  const ajouter = (categorie) => {
    setConsommations(prev => ({
      ...prev,
      [categorie]: prev[categorie] + 1,
    }));
  };

  const resetSemaine = () => {
    if(confirm("Voulez-vous vraiment effacer les compteurs ?")) {
        setConsommations({
          cafe: 0,
          chocolat: 0,
          creme: 0,
          noisette: 0,
          jusOrange: 0,
        });
    }
  };

  const generateRapport = () => {
    const { cafe, chocolat, creme, noisette, jusOrange } = consommations;
    return `Rapport de la semaine :
Café : ${cafe}
Chocolat : ${chocolat}
Crème : ${creme}
Noisette : ${noisette}
Jus d’orange : ${jusOrange}
Total : ${cafe + chocolat + creme + noisette + jusOrange}`;
  };

  const partagerRapport = () => {
    const rapport = generateRapport();
    if (navigator.share) {
      navigator.share({
        title: 'Rapport Consos',
        text: rapport,
      }).catch(() => alert('Erreur de partage'));
    } else {
      alert("Voici votre rapport :\n" + rapport);
    }
  };

  // Styles simplifiés pour le Web
  const styles = {
    container: { padding: '20px', fontFamily: 'sans-serif', textAlign: 'center', maxWidth: '400px', margin: 'auto' },
    title: { fontSize: '24px', color: '#333' },
    item: { 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '10px', borderBottom: '1px solid #eee', marginBottom: '10px' 
    },
    button: { padding: '8px 15px', backgroundColor: '#007AFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    btnReset: { marginTop: '20px', padding: '10px', backgroundColor: '#FF3B30', color: 'white', border: 'none', borderRadius: '5px', width: '100%' },
    btnShare: { marginTop: '10px', padding: '10px', backgroundColor: '#34C759', color: 'white', border: 'none', borderRadius: '5px', width: '100%' }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Comptage Consomatin</h1>

      {[
        { id: 'cafe', label: 'Café' },
        { id: 'chocolat', label: 'Chocolat' },
        { id: 'creme', label: 'Crème' },
        { id: 'noisette', label: 'Noisette' },
        { id: 'jusOrange', label: 'Jus d’orange' }
      ].map(item => (
        <div key={item.id} style={styles.item}>
          <span>{item.label} : <strong>{consommations[item.id]}</strong></span>
          <button style={styles.button} onClick={() => ajouter(item.id)}>Ajouter</button>
        </div>
      ))}

      <button style={styles.btnReset} onClick={resetSemaine}>Effacer cette semaine</button>
      <button style={styles.btnShare} onClick={partagerRapport}>Partager le rapport</button>
    </div>
  );
}

// La ligne magique pour afficher l'appli dans le <div id="root">
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
