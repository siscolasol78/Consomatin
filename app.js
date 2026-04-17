import React, { useState } from 'react';

import { View, Text, Button, StyleSheet, ScrollView, Share } from 'react-native';

export default function App() {
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
    setConsommations({
      cafe: 0,
      chocolat: 0,
      creme: 0,
      noisette: 0,
      jusOrange: 0,
    });
  };

  // Fonction pour générer le rapport
  const generateRapport = () => {
    const { cafe, chocolat, creme, noisette, jusOrange } = consommations;
    return `
Rapport de la semaine :
Café : ${cafe}
Chocolat : ${chocolat}
Crème : ${creme}
Noisette : ${noisette}
Jus d’orange : ${jusOrange}
Total : ${cafe + chocolat + creme + noisette + jusOrange}
`;
  };

  // Fonction pour partager le rapport
  const partagerRapport = async () => {
    const rapport = generateRapport();
    try {
      await Share.share({ message: rapport });
    } catch (error) {
      alert('Erreur lors du partage');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Comptage des consommations</Text>

      {/* Café */}
      <View style={styles.item}>
        <Text>Café : {consommations.cafe}</Text>
        <Button title="Ajouter Café" onPress={() => ajouter('cafe')} />
      </View>

      {/* Chocolat */}
      <View style={styles.item}>
        <Text>Chocolat : {consommations.chocolat}</Text>
        <Button title="Ajouter Chocolat" onPress={() => ajouter('chocolat')} />
      </View>

      {/* Crème */}
      <View style={styles.item}>
        <Text>Crème : {consommations.creme}</Text>
        <Button title="Ajouter Crème" onPress={() => ajouter('creme')} />
      </View>

      {/* Noisette */}
      <View style={styles.item}>
        <Text>Noisette : {consommations.noisette}</Text>
        <Button title="Ajouter Noisette" onPress={() => ajouter('noisette')} />
      </View>

      {/* Jus d'orange */}
      <View style={styles.item}>
        <Text>Jus d’orange : {consommations.jusOrange}</Text>
        <Button title="Ajouter Jus" onPress={() => ajouter('jusOrange')} />
      </View>

      {/* Bouton pour réinitialiser la semaine */}
      <View style={styles.reset}>
        <Button title="Effacer cette semaine" color="red" onPress={resetSemaine} />
      </View>

      {/* Bouton pour partager */}
      <View style={styles.shareButton}>
        <Button title="Partager le rapport" onPress={partagerRapport} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  item: {
    marginVertical: 10,
    width: '100%',
  },
  reset: {
    marginTop: 30,
  },
  shareButton: {
    marginTop: 20,
  },
});
