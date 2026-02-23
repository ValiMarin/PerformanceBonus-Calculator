function Info({ onClose }) {
  return (
    <div className="coverPanel">
      <div className="infoTextHolder">
        <h1>Anleitung</h1>

        <p className="infoText">
          &nbsp;&nbsp;Dieser Rechner wurde auf Grundlage der Produktionsprozesse
          bei der Westfälischen Fleischwarenfabrik Stockmeyer GmbH entwickelt
          und dient zur Berechnung der Produktionsmenge, die erforderlich ist,
          um einen Bonus (Zusatzvergütung) zu erreichen. Das Werk verfügt über
          mehr als 30 Verpackungslinien im Drei-Schicht-System, wobei jeder
          Linie ein verantwortlicher Mitarbeiter zugeordnet ist, der die
          Bonusberechnung bislang manuell durchführt. Mit diesem Tool können
          Mitarbeitende die erforderliche Produktionsmenge durch einfache
          Eingabe der relevanten Daten schnell, einheitlich und nachvollziehbar
          berechnen.
          <br />
          <br /> &nbsp;&nbsp;<b>So wird es verwendet!</b>
          <br /> Der Mitarbeiter muss 3 Hauptbereiche ausfüllen:
          <br />
          <br />
          &nbsp;&nbsp; 1. <b>Zeitrechner –</b> berechnet die gesamte Arbeitszeit
          basierend darauf, wie viele Personen der jeweiligen Linie zugeordnet
          sind, und zieht unvorhergesehene Zeitverluste ab.
          <br /> <br />
          &nbsp;&nbsp; <b>2. Rüstenrechner –</b> berechnet jede erwartete
          Aktion, die auftreten kann (z. B. Etikettenwechsel, Folienwechsel
          usw.). Jede Aktion hat einen spezifischen Linien-Koeffizienten, der
          die Aktionszeit multipliziert. Alle Aktionen werden anschließend
          summiert und mit der Anzahl der Personen multipliziert. Das Ergebnis
          wird nochmals mit 1,35 multipliziert, da die Linie für den Bonus mit
          135 % Kapazität produzieren muss.
          <br /> <br />
          &nbsp;&nbsp; 3. <b>Fertige Sorten – </b>zeigt die Aufträge, die
          bereits von den Mitarbeitern erledigt wurden. Jeder Auftrag enthält
          die Anzahl der produzierten Kisten sowie einen spezifischen
          Koeffizienten für jedes Produkt. Die Berechnung erfolgt durch
          Summierung aller Produkte, wobei die Anzahl der Kisten jedes Produkts
          mit dem entsprechenden Koeffizienten multipliziert wird.
          <br /> <br />
          &nbsp;&nbsp; Nachdem alle drei Bereiche ausgefüllt sind, muss der
          Mitarbeiter den aktuellen Koeffizienten im Feld Letzte Sorte eingeben
          und dann auf Berechnen drücken, um die Menge zu ermitteln, die
          hergestellt werden muss, um den Bonus zu erreichen.
        </p>

        <button className="panelBtn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Info;
