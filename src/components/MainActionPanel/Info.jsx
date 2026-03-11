import LanguagesPanel from "../LanguagesPanel";

function Info({ onClose, language, setLanguage }) {
  const titles = ["Anleitung", "Instrucțiuni", "Instructions", "Инструкции"];

  const text = [
    `&nbsp;&nbsp;&nbsp;&nbsp;Dieser Rechner wurde auf Grundlage der Produktionsprozesse bei der 
    Westfälischen Fleischwarenfabrik Stockmeyer GmbH entwickelt und dient zur Berechnung der Produktionsmenge, 
    die erforderlich ist, um die Prämie zu erreichen. Das Werk verfügt über viele Verpackum-Linien, wobei jeder 
    Linie ein verantwortlicher Mitarbeiter zugeordnet ist, der die Bonusberechnung bislang manuell durchführt. 
    Mit diesem Tool können Mitarbeitende die erforderliche Produktionsmenge durch einfache Eingabe der relevanten Daten schnell, 
    einheitlich und nachvollziehbar berechnen.
    <br /><br /> &nbsp;&nbsp;&nbsp;&nbsp;<b>So wird es verwendet!</b>
    <br /> Der Mitarbeiter muss 3 Hauptbereiche ausfüllen:
    <br /><br />
    &nbsp;&nbsp;&nbsp;&nbsp; 1. <b>Zeitrechner –</b> berechnet die gesamte Arbeitszeit
     basierend auf dem Arbeitsplan der Mitarbeiter und zieht unvorhergesehene Zeitverluste ab.
    <br /><br />
    &nbsp;&nbsp;&nbsp;&nbsp; <b>2. Rüstenrechner –</b> berechnet jede erwartete
    Aktion, die auftreten kann (z. B. Etikettenwechsel, Folienwechsel
    usw.). Jede Aktion hat einen spezifischen Linien-Koeffizienten, der
    die Aktionszeit multipliziert. Alle Aktionen werden anschließend
    summiert und mit der Anzahl der Personen multipliziert. Das Ergebnis
    wird nochmals mit 1,35 multipliziert, da die Linie für den Bonus mit
    135 % Kapazität produzieren muss.
    <br /><br />
    &nbsp;&nbsp;&nbsp;&nbsp; 3. <b>Fertige Sorten – </b>zeigt die Aufträge, die
    bereits von den Mitarbeitern erledigt wurden. Jeder Auftrag enthält
    die Anzahl der produzierten Kisten sowie einen spezifischen
    Koeffizienten für jedes Produkt. Die Berechnung erfolgt durch
    Summierung aller Produkte, wobei die Anzahl der Kisten jedes Produkts
    mit dem entsprechenden Koeffizienten multipliziert wird.
    <br /><br />
    &nbsp;&nbsp;&nbsp;&nbsp; Nachdem alle drei Bereiche ausgefüllt sind, muss der
    Mitarbeiter den aktuellen Koeffizienten im Feld Aktuelle Sorte eingeben
    und dann auf Berechnen drücken, um die Menge zu ermitteln, die
    hergestellt werden muss, um den Bonus zu erreichen.
    <br /><br />
    &nbsp;&nbsp;&nbsp;&nbsp;Die allgemeine Formel zur Berechnung der Prämie lautet:<br />
    Prämie voll = (Gesamt Rüstenrechner × 1,35 + Gesamt Fertige Sorten) / Gesamt Zeitrechner`,
    `&nbsp;&nbsp;&nbsp;&nbsp;Acest calculator a fost dezvoltat pe baza proceselor de producție de la 
  Westfälischen Fleischwarenfabrik Stockmeyer GmbH și servește pentru a calcula cantitatea de producție 
  necesară pentru a obține Prämie. Fabrica dispune de multe linii de împachetare Verpackum, fiecare 
  linie având un angajat responsabil care până acum efectua calculul bonusului manual. 
  Cu acest instrument, angajații pot calcula rapid, uniform și transparent cantitatea necesară 
  prin simpla introducere a datelor relevante.
  <br /><br /> &nbsp;&nbsp;&nbsp;&nbsp;<b>Așa se folosește!</b>
  <br /> Angajatul trebuie să completeze 3 zone principale:
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp; 1. <b>Zeitrechner –</b> calculează timpul total de lucru 
  în funcție de programul muncitorilor și scade pierderile de timp neprevăzute.
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp; <b>2. Rüstenrechner –</b> calculează fiecare acțiune 
  care poate apărea (de ex. schimbare etichete, schimbare folie etc.). 
  Fiecare acțiune are un coeficient specific liniei care multiplică timpul acțiunii. 
  Toate acțiunile sunt apoi adunate și înmulțite cu numărul de persoane. 
  Rezultatul este în continuare înmulțit cu 1,35 deoarece linia trebuie să producă 
  la 135% capacitate pentru bonus.
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp; 3. <b>Fertige Sorten – </b>arată comenzile care 
  au fost deja realizate de angajați. Fiecare comandă conține numărul de 
  lăzi produse precum și un coeficient specific pentru fiecare produs. 
  Calculul se face prin însumarea tuturor produselor, unde numărul de lăzi 
  pentru fiecare produs este înmulțit cu coeficientul corespunzător.
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp; După ce toate cele trei zone au fost completate, 
  angajatul trebuie să introducă coeficientul curent în câmpul 
  Sorta actuală și apoi să apese pe Calculare pentru a determina 
  cantitatea care trebuie produsă pentru a obține bonusul.
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp;Formula generală pentru calculul Prämie este:<br />
  Premia ful = (Total Rüstenrechner × 1,35 + Total Fertige Sorten) / Total Zeitrechner`,
    `&nbsp;&nbsp;&nbsp;&nbsp;This calculator was developed based on the production processes at 
  Westfälischen Fleischwarenfabrik Stockmeyer GmbH and is used to calculate the 
  production quantity required to reach the Prämie bonus. The factory has many 
  Verpackum packing lines, where each line has a responsible employee who previously 
  calculated the bonus manually. With this tool, employees can quickly, consistently 
  and transparently calculate the required production quantity by simply entering 
  the relevant data.
  <br /><br /> &nbsp;&nbsp;&nbsp;&nbsp;<b>How it is used!</b>
  <br /> The employee must complete 3 main sections:
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp; 1. <b>Zeitrechner –</b> calculates the total working time 
  based on the workers' schedule and subtracts unexpected time losses.
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp; <b>2. Rüstenrechner –</b> calculates every expected action 
  that may occur (e.g. label change, foil change etc.). Each action has 
  a specific line coefficient that multiplies the action time. All actions 
    are then summed and multiplied by the number of workers. The result is 
  multiplied again by 1.35 because the line must produce at 135% capacity 
  to reach the bonus.
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp; 3. <b>Fertige Sorten – </b>shows the orders that 
  have already been completed by the employees. Each order contains the 
  number of produced crates and a specific coefficient for each product. 
  The calculation is done by summing all products, where the number of 
  crates of each product is multiplied by the corresponding coefficient.
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp; After all three sections are completed, the employee must 
  enter the current coefficient in the field Current Product and then press 
  Calculate to determine the quantity that must be produced to reach the bonus.
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp;The general formula for calculating the Prämie is:<br />
  Prämie full = (Rüstenrechner × 1.35 + Fertige Sorten) / Zeitrechner`,
    `&nbsp;&nbsp;&nbsp;&nbsp;Этот калькулятор был разработан на основе производственных процессов 
  на предприятии Westfälischen Fleischwarenfabrik Stockmeyer GmbH и используется 
  для расчёта объёма производства, необходимого для получения премии Prämie. 
  На предприятии имеется много упаковочных линий Verpackum, и за каждой линией 
  закреплён ответственный сотрудник, который ранее рассчитывал премию вручную. 
  С помощью этого инструмента сотрудники могут быстро, единообразно и прозрачно 
  рассчитать необходимый объём производства, просто введя соответствующие данные.
  <br /><br /> &nbsp;&nbsp;&nbsp;&nbsp;<b>Как это используется!</b>
  <br /> Сотрудник должен заполнить 3 основных раздела:
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp; 1. <b>Zeitrechner –</b> рассчитывает общее рабочее время 
  на основе графика работников и вычитает непредвиденные потери времени.
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp; <b>2. Rüstenrechner –</b> рассчитывает каждое возможное 
  действие (например, смена этикеток, смена плёнки и т.д.). Каждое действие 
  имеет специальный коэффициент линии, который умножает время действия. 
  Все действия затем суммируются и умножаются на количество работников. 
  Результат дополнительно умножается на 1,35, поскольку линия должна 
  производить на 135% мощности для получения премии.
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp; 3. <b>Fertige Sorten – </b>показывает заказы, которые уже 
  были выполнены сотрудниками. Каждый заказ содержит количество 
  произведённых ящиков, а также специальный коэффициент для каждого 
  продукта. Расчёт выполняется путём суммирования всех продуктов, 
  где количество ящиков каждого продукта умножается на соответствующий коэффициент.
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp; После заполнения всех трёх разделов сотрудник должен 
  ввести текущий коэффициент в поле Текущий сорт и затем нажать 
  Рассчитать, чтобы определить количество, которое необходимо 
  произвести для получения премии.
  <br /><br />
  &nbsp;&nbsp;&nbsp;&nbsp;Общая формула расчёта премии:<br />
  Prämie полный = (Rüstenrechner × 1.35 + Fertige Sorten) / Zeitrechner`,
  ];

  const verticalPosition = 11;
  const horizontalPosition = 3;

  return (
    <div className="coverPanel">
      <div className="infoTextHolder">
        <h1>{titles[language]}</h1>

        <p
          className="infoText"
          dangerouslySetInnerHTML={{ __html: text[language] }}
        />

        <button className="panelBtn" onClick={onClose}>
          OK
        </button>
      </div>

      <LanguagesPanel
        setLanguage={setLanguage}
        verticalPosition={verticalPosition}
        horizontalPosition={horizontalPosition}
      />
    </div>
  );
}

export default Info;
