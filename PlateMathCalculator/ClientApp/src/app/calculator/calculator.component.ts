import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  barbell = 45

  weights = [
    { name: "2.5lb", value: 2.5, count: 2 },
    { name: "5lb", value: 5, count: 2 },
    { name: "10lb", value: 10, count: 4 },
    { name: "25lb", value: 25, count: 4 },
    { name: "35lb", value: 35, count: 2 },
    { name: "45lb", value: 45, count: 6 },
    { name: "100lb", value: 100, count: 0 }
  ]

  desiredWeight = 250

  constructor(){ }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log("CHANGE")
  }

  getTotalWeight() {
    var totalWeight = this.barbell
    this.weights.forEach(function (weight) {
      totalWeight += (weight.count * weight.value)
    })
    return totalWeight
  }

  calculateRequiredPlates() {
    var requiredWeights = []

    /* Subtract bar weight from desired weight. */
    var requiredWeightPlateTotal = this.desiredWeight - this.barbell

    /* Loop over weights to build up weight per side */
    this.weights.sort((a, b) => (a.value < b.value) ? 1 : -1)

    this.weights.forEach(weight => {
      /* Skip plates that don't have any pairs */
      if (weight.count < 2) {
        return;
      }

      var platePairs = weight.count / 2;

      for (let i = 0; i < platePairs; i += 1) {
        /* Check that 2 plates doesn't exceed requiredWeightPlateTotal */
        if (weight.value * 2 <= requiredWeightPlateTotal) {
          requiredWeights.push({ weight: weight, count: 2 });
          requiredWeightPlateTotal -= (weight.value * 2);
        }
      }
    })

    /* Return string of plates in order */
    var outputString = ""

    for (let i = requiredWeights.length - 1; i >= 0; i--) {
      outputString = outputString + requiredWeights[i].weight.name + " - "
    }

    outputString = outputString + " | Barbell " + this.barbell + "lbs | ";

    for (let i = 0; i <= requiredWeights.length - 1; i++) {
      outputString = outputString + " - " + requiredWeights[i].weight.name
    }

    return outputString;
  }
}
