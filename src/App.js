import {Container, Grid, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";

function App() {
  const [stockValue, setStockValue] = useState(90000);
  const [equityPercentage, setEquityPercentage] = useState(0.15);
  const [lastRoundSize, setLastRoundSize] = useState(20000000);
  const [companyValuation, setCompanyValuation] = useState(60000000);
  const [potentialValuation, setPotentialValuation] = useState(1000000000);
  const [valuationMultiplier, setValuationMultiplier] = useState(3);
  const [roundMultiplier, setRoundMultiplier] = useState(3);
  const [dilutionRatio, setDilutionRatio] = useState(25);

  useEffect(() => {
    if (stockValue === (equityPercentage / 100) * companyValuation) {
      return;
    }
    setStockValue((equityPercentage / 100) * companyValuation);
  }, [equityPercentage]);

  useEffect(() => {
    if (equityPercentage === (stockValue / companyValuation) * 100) {
      return;
    }

    setEquityPercentage((stockValue / companyValuation) * 100)
  }, [stockValue])

  useEffect(() => {
    setCompanyValuation(lastRoundSize * valuationMultiplier);
  }, [lastRoundSize, valuationMultiplier])

  const numberOfRaises = (Math.log(potentialValuation) - Math.log(companyValuation)) / Math.log(roundMultiplier);
  const dilution = Math.pow((100 - dilutionRatio) / 100, numberOfRaises);
  const potentialStockValue = (equityPercentage / 100) * potentialValuation * dilution;

  return (
    <div className="App">
      <Container sx={{mt: 3}} maxWidth="sm">
        <Stack spacing={2}>

          <Typography variant="h4">Stock Potential Calculator</Typography>
          <Typography>
            One of the most common questions that employees who get job offers need to deal with is how do they know to
            estimate
            the value of the stock options they got offered, and how to calculate the potential stock value over time.
            This is indeed a complicated topic and is hard to estimate mathematically, but I did make a simple
            calculator
            that will show the average of what type of return you should assume your stock will have.
          </Typography>
          <Typography>
            Note that this calculator ignores the strike price of options. You will first have to deduct
            the cost of acquiring the stock. The actual value of your stock is calculated by the following formula:
          </Typography>

          <Typography sx={{fontWeight: "bold"}}>
            Stock Value = Options x (Stock Price - Strike Price)
          </Typography>

          <Typography variant="h6">How to Use</Typography>

          <Typography>
            First, fill in the company details. Then enter your stock offer (either in value or percentage) and
            the calculator will calculate how much it estimates your stock will be worth when the company
            will reach the expected valuation.
          </Typography>

          <Typography variant="h6">Company Details</Typography>

          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <TextField

                fullWidth
                label="Last round size"
                type="number"
                variant="outlined"
                value={lastRoundSize}
                inputProps={{
                  step: "1000000",
                }}
                onChange={(e) => setLastRoundSize(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Round size to valuation multiplier"
                type="number"
                variant="outlined"
                value={valuationMultiplier}
                onChange={(e) => setValuationMultiplier(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company valuation"
                type="number"
                variant="outlined"
                value={companyValuation}
                inputProps={{
                  step: "1000000",
                }}
                onChange={(e) => setCompanyValuation(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Average dilution per round"
                type="number"
                variant="outlined"
                value={dilutionRatio}
                onChange={(e) => setDilutionRatio(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Potential company valuation"
                type="number"
                variant="outlined"
                value={potentialValuation}
                inputProps={{
                  step: "1000000",
                }}
                onChange={(e) => setPotentialValuation(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Round valuation increase multiplier"
                type="number"
                variant="outlined"
                value={roundMultiplier}
                onChange={(e) => setRoundMultiplier(e.target.value)}
              />
            </Grid>
          </Grid>

<Typography variant="h6">Stock Offer</Typography>

          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stock value"
                type="number"
                inputProps={{
                  step: "10000"
                }}
                variant="outlined"
                value={stockValue}
                onChange={(e) => setStockValue(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Equity percentage"
                type="number"
                inputProps={{
                  step: "0.1",
                  min: "0",
                  max: "100",
                }}
                variant="outlined"
                value={equityPercentage}
                onChange={(e) => setEquityPercentage(e.target.value)}
              />

            </Grid>
          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <Typography>Number of raises needed:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">{numberOfRaises.toFixed(2)}</Typography>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <Typography>Dilution ratio for all rounds: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">{dilution.toFixed(2)}</Typography>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <Typography>Potential stock value:</Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography align="right" sx={{fontWeight: "bold"}}>${parseInt(potentialStockValue).toLocaleString()}</Typography>
            </Grid>
          </Grid>

        </Stack>
      </Container>
    </div>
  );
}

export default App;
