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
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const isNumber = (value) =>
  !isNaN(parseFloat(value)) && isFinite(value) && value > 0;

const rows = [];
for (let i = 1; i <= 12; i++) {
  rows.push({
    lives: i,
    value: 2 ** i - 1,
    lossChance: ((1 / 2) ** i * 100).toFixed(3)
  });
}

function App() {
  const [bankroll, setBankroll] = useState(90);
  const [lives, setLives] = useState(2);
  const [wins, setWins] = useState(0);
  const [increment, setIncrement] = useState(1);

  const optimalBet = (bankroll, lives) => {
    if (!isNumber(bankroll) || !isNumber(lives)) {
      return 'N/A';
    } else {
      const bet = parseFloat(bankroll) / (2 ** parseFloat(lives) - 1);
      return Math.floor(bet / increment) * increment;
    }
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Typography variant="h2" component="h2" marginBottom={2}>
          Calculator
        </Typography>
        <Typography variant="body1">
          Optimal Bet: {optimalBet(bankroll, lives)}
        </Typography>
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
                setWins(0);
              }}
              error={!isNumber(lives)}
              helperText={!isNumber(lives) ? 'Please enter a number' : ''}
              value={lives}
            />
            <FormControl fullWidth>
              <InputLabel id="increment-label">Rounding Increment</InputLabel>
              <Select
                labelId="increment-label"
                id="increment"
                value={increment}
                label="Rounding Increment"
                onChange={(event) => setIncrement(event.target.value)}
                align="left"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2.5}>2.50</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2} justifyContent="end">
              <Button
                variant="contained"
                id="calculate"
                onClick={() => {
                  if (!isNumber(bankroll) || !isNumber(lives)) {
                    return;
                  }
                  setBankroll(
                    parseFloat(bankroll) + optimalBet(bankroll, lives)
                  );
                  setWins(wins + 1);
                }}
              >
                Next Bet
              </Button>
            </Stack>
          </Stack>
        </div>
        <Typography variant="h2" component="h2" marginBottom={2}>
          Values
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Lives</TableCell>
                <TableCell align="right">Bankroll Divisor</TableCell>
                <TableCell align="right">Chance of Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.lives}>
                  <TableCell>{row.lives}</TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  <TableCell align="right">{row.lossChance + '%'}</TableCell>
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
