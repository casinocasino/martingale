import { useState } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  createTheme,
  ThemeProvider,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  CssBaseline
} from '@mui/material';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const rows = [];
for (let i = 1; i <= 10; i++) {
  rows.push({ lives: i, value: 2 ** i - 1 });
}

const isNumber = (value) =>
  !isNaN(parseFloat(value)) && isFinite(value) && value > 0;

function App() {
  const [bet, setBet] = useState(30);
  const [bankroll, setBankroll] = useState(90);
  const [lives, setLives] = useState(2);
  const [wins, setWins] = useState(0);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Typography variant="h2" component="h2" marginBottom={2}>
          Martingale Calculator
        </Typography>
        <Typography variant="body1">Optimal Bet: {bet}</Typography>
        <Typography variant="body1" marginBottom={2}>
          Number of Wins: {wins}
        </Typography>
        <div>
          <Stack direction="column" spacing={2} marginBottom={2}>
            <TextField
              id="bankroll"
              label="Bankroll"
              variant="outlined"
              onChange={(event) => {
                setBankroll(event.target.value);
                if (isNumber(event.target.value) && isNumber(lives)) {
                  setBet(
                    Math.floor(
                      parseFloat(event.target.value) /
                        (2 ** parseFloat(lives) - 1)
                    )
                  );
                } else {
                  setBet('N/A');
                }
                setWins(0);
              }}
              error={!isNumber(bankroll)}
              helperText={!isNumber(bankroll) ? 'Please enter a number' : ''}
              value={bankroll}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              }}
            />
            <TextField
              id="lives"
              label="Lives"
              variant="outlined"
              onChange={(event) => {
                setLives(event.target.value);
                if (isNumber(event.target.value) && isNumber(bankroll)) {
                  setBet(
                    Math.floor(
                      parseFloat(bankroll) /
                        (2 ** parseFloat(event.target.value) - 1)
                    )
                  );
                } else {
                  setBet('N/A');
                }
                setWins(0);
              }}
              error={!isNumber(lives)}
              helperText={!isNumber(lives) ? 'Please enter a number' : ''}
              value={lives}
            />
            <Stack direction="row" spacing={2} justifyContent="end">
              <Button
                variant="text"
                id="reset"
                onClick={() => {
                  setBankroll(90);
                  setLives(2);
                  setBet(30);
                  setWins(0);
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                id="calculate"
                onClick={() => {
                  if (!isNumber(bankroll) || !isNumber(lives)) {
                    return;
                  }
                  console.log(
                    `Bankroll: ${bankroll}, Lives: ${lives}, Bet: ${bet}, Wins: ${wins}`
                  );
                  setBankroll(parseFloat(bankroll) + parseFloat(bet));
                  setWins(wins + 1);
                  setBet(
                    Math.floor(
                      (parseFloat(bankroll) + parseFloat(bet)) /
                        (2 ** lives - 1)
                    )
                  );
                }}
              >
                Next Bet
              </Button>
            </Stack>
          </Stack>
        </div>
        <Typography variant="h2" component="h2" marginBottom={2}>
          Martingale Values
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Lives</TableCell>
                <TableCell align="right">Bankroll Divisor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.lives}>
                  <TableCell>{row.lives}</TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </>
  );
}

export default App;
