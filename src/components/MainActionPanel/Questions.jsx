import LanguagesPanel from "../LanguagesPanel";

function Questions({ onClose, language, setLanguage, question }) {
  const questions = [
    [
      "Was stellt dieser Prozentsatz dar?",
      "Ce reprezintă acest procentaj?",
      "What does this percent mean?",
      "Что означает этот процент?",
    ],
    [
      "Was bedeutet dieses Ergebnis?",
      "Ce reprezintă acest rezultat?",
      "What does this result represent?",
      "Что означает этот результат?",
    ],
    [
      "Was bedeutet: „Aktuelle Sorte”?",
      "Ce reprezintă: „Aktuelle Sorte”?",
      "What does “Aktuelle Sorte” mean?",
      "Что означает: «Aktuelle Sorte»?",
    ],
  ];

  const answers = [
    [
      `&nbsp;&nbsp;&nbsp;&nbsp;Der Prozentsatz stellt genau die Prämie dar, die 135% betragen muss, um vollständig zu sein.<br />
    &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;">Achtung!</span> Der Prozentsatz berücksichtigt die Produktmenge der aktuellen Sorte nicht. 
    Wenn Sie den tatsächlich erreichten Prozentsatz genau berechnen möchten, geben Sie die Produktmenge, 
    die Sie von der aktuellen Sorte hergestellt haben, bei <b>„Fertige Sorten”</b> ein und klicken Sie auf <b>„Berechnen”</b>.`,
      `&nbsp;&nbsp;&nbsp;&nbsp;Procentajul reprezintă exact premia, care trebuie să fie de 135% pentru a fi 
    completă.<br />&nbsp;&nbsp;&nbsp;&nbsp; <span style="color: red;">Atenție!</span> Procentajul nu ia în calcul cantitatea de produs de la sortul actual. Dacă
     doriți să aflați procentajul exact realizat, introduceți cantitatea de produs pe care ați 
     realizat-o din sortul actual la <b>„Fertige Sorten”</b> și apăsați <b>„Berechnen”</b>.`,
      `&nbsp;&nbsp;&nbsp;&nbsp;The percentage represents exactly the Prämie bonus, which must be 135% to be complete.<br />
    &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;">Attention!</span> The percentage does not take into account the quantity of product from the current batch. 
    If you want to know the exact achieved percentage, enter the quantity of product you have produced from the current product <b>„Fertige Sorten”</b> and click <b>„Berechnen”</b>.`,
      `&nbsp;&nbsp;&nbsp;&nbsp;Процент точно отражает премию, которая должна составлять 135%, чтобы быть полной.<br />
    &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;">Внимание!</span> Процент не учитывает количество продукта текущей партии. 
    Если вы хотите узнать точный достигнутый процент, введите количество произведенного продукта из текущей партии в <b>„Fertige Sorten”</b> и нажмите <b>„Berechnen”</b>.`,
    ],
    [
      `&nbsp;&nbsp;&nbsp;&nbsp;Dieses Ergebnis stellt die <span style="color: red;">exakte</span> Produktmenge dar, die aus der aktuellen Sorte hergestellt werden muss, um die Prämie zu vervollständigen (135%).`,
      `&nbsp;&nbsp;&nbsp;&nbsp;Acest rezultat reprezintă <span style="color: red;">exact</span> cantitatea de produs ce trebuie realizată din sortul actual pentru a completa premia (135%).`,
      `&nbsp;&nbsp;&nbsp;&nbsp;This result represents the <span style="color: red;">exact</span> quantity of product that must be produced from the current product to complete the Prämie (135%).`,
      `&nbsp;&nbsp;&nbsp;&nbsp;Этот результат показывает <span style="color: red;">точное</span> количество продукта, которое необходимо произвести из текущей партии, чтобы выполнить премию (135%).`,
    ],
    [
      `<b>&nbsp;&nbsp;&nbsp;&nbsp;Aktuelle Sorte</b> steht für die aktuelle Sorte, also die Sorte, an der du gerade arbeitest. 
        Du musst den Koeffizienten hier ausfüllen, um zu erfahren, wie viel noch zu tun ist, um die Prämie zu vervollständigen. <br /> 
        Praktisch: Nach Abschluss einer Sorte wird die Menge zu <b>Fertige Sorten</b> übertragen und du musst den Koeffizienten der neuen aktuellen Sorte erneut eingeben.`,
      `<b>&nbsp;&nbsp;&nbsp;&nbsp;Aktuelle Sorte</b> reprezintă sortul actual, adică sortul la care lucrezi fix acum. Trebuie să completezi coeficientul aici ca să afli cât mai ai de făcut ca să completezi premia.<br /> 
       &nbsp;&nbsp;&nbsp;&nbsp;Practic, după terminarea unui sort, cantitatea o vei trece la <b>Fertige Sorten</b> și trebuie să rescrii iar coeficientul noului sort actual.`,
      `<b>&nbsp;&nbsp;&nbsp;&nbsp;Aktuelle Sorte</b> represents the current product, referring exactly the curreent product you are working on right now. 
        You need to fill in the coefficient here to see how much remains to complete the Prämie.<br /> 
        <b>&nbsp;&nbsp;&nbsp;&nbsp;Practically, after finishing a product, the quantity will be moved to <b>Fertige Sorten</b> and you need to enter the coefficient of the new current product again.`,
      `<b>Aktuelle Sorte</b> обозначает текущую партию, то есть ту партию, над которой вы работаете прямо сейчас.
        Необходимо заполнить коэффициент здесь, чтобы узнать, сколько осталось сделать для выполнения премии. <br />
        &nbsp;&nbsp;&nbsp;&nbsp;Практически, после завершения партии, количество будет перенесено в <b>Fertige Sorten</b>, и вам нужно снова ввести коэффициент новой текущей партии.`,
    ],
  ];
  return (
    <div className="coverPanel">
      <div className="actionPanel">
        <h1>{questions[question][language]}</h1>

        <p
          className="infoText"
          dangerouslySetInnerHTML={{ __html: answers[question][language] }}
        />

        <button className="panelBtn" onClick={onClose}>
          OK
        </button>
      </div>

      <LanguagesPanel setLanguage={setLanguage} />
    </div>
  );
}

export default Questions;
