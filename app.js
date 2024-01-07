// Returns a random DNA base
const returnRandBase = () =>
{
  const dnaBases = [ 'A', 'T', 'C', 'G' ]
  return dnaBases[ Math.floor(Math.random() * 4) ]
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () =>
{
  const newStrand = []
  for (let i = 0; i < 15; i++)
  {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Factory function for creating pAequor objects
const pAequorFactory = (specimenNum, dna) =>
{
  return {
    specimenNum: specimenNum,
    dna: dna,
    // Mutates a random base in the DNA strand
    mutate()
    {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (newBase === this.dna[ randomIndex ])
      {
        newBase = returnRandBase();
      }
      this.dna[ randomIndex ] = newBase;
      return this.dna;
    },
    // Compares DNA with another pAequor and prints the percentage of common bases
    compareDNA(otherPaequor)
    {
      let commonBases = 0;
      for (let i = 0; i < this.dna.length; i++)
      {
        if (this.dna[ i ] === otherPaequor.dna[ i ])
        {
          commonBases++;
        }
      }
      const commonPercentage = (commonBases / this.dna.length) * 100;
      console.log(`Specimen #${this.specimenNum} and Specimen #${otherPaequor.specimenNum} have ${commonPercentage.toFixed(2)}% DNA in common.`);
    },
    // Checks if the pAequor is likely to survive based on a CG content threshold
    willLikelySurvive()
    {
      const cgCount = this.dna.filter(base => base === 'C' || base === 'G').length;
      const survivalPercentage = (cgCount / this.dna.length) * 100;
      return survivalPercentage >= 60;
    }
  };
}

// Create 30 instances of pAequor that can likely survive
const pAequorInstances = [];
let specimenNum = 1;

while (pAequorInstances.length < 30)
{
  const newDna = mockUpStrand();
  const newPaequor = pAequorFactory(specimenNum, newDna);
  if (newPaequor.willLikelySurvive())
  {
    pAequorInstances.push(newPaequor);
    specimenNum++;
  }
}

console.log(pAequorInstances);
