invoice = [
  {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "hamlet",
        "audience": 55
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 40
      }
    ]
  }
]
plays = {
  "hamlet": {"name": "Hamlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "othello": {"name": "Othello", "type": "tragedy"}
}  



  function statement (invoice, plays) {
    let totalAmount = 0;
    
    let result = `Statement for ${invoice[0].customer}\n`;

  
    for (let perf of invoice[0].performances) {

      // print line for this order
      result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
      totalAmount += amountFor(perf);
    }


    let volumeCredits = totalVolumeCredits();

    result += `Amount owed is ${usd(totalAmount)}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;









    
    function amountFor(aPerformance){
      let result = 0;
      switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
          throw new Error(`unknown type: ${playFor(aPerformance).type}`);
      }
      return result
    }

    function playFor(aPerformance){
      return plays[aPerformance.playID]
    }

    function volumeCreditsFor(aPerformance){
      let result = 0;
      // add volume credits
      result += Math.max(aPerformance.audience - 30, 0);
      // add extra credit for every ten comedy attendees
      if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
      return result
    }

    function usd(aNumber){
      return new Intl.NumberFormat("en-US",
      { style: "currency", currency: "USD",
        minimumFractionDigits: 2 }).format(aNumber/100)
    }

    function totalVolumeCredits(){
      let volumeCredits = 0;
      for (let perf of invoice[0].performances) {
        volumeCredits += volumeCreditsFor(perf);
      }
      return volumeCredits;
    }
  }




// console.log(invoice[0].aPerformanceormances)
// console.log(plays)
console.log(statement(invoice, plays))




