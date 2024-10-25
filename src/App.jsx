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
  MenuItem,
  Slider
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
    value: 2 ** i - 1
  });
}

function App() {
  const [bankroll, setBankroll] = useState(90);
  const [lives, setLives] = useState(2);
  const [increment, setIncrement] = useState(1);
  const [winOdds, setWinOdds] = useState(18 / 37);

  const optimalBet = (n) => {
    if (!isNumber(bankroll) || !isNumber(lives)) {
      return 'N/A';
    } else {
      const bet = parseFloat(bankroll) / (2 ** parseFloat(n) - 1);
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
        <Stack direction="column" spacing={2} marginBottom={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              sx={{ width: '100%' }}
              id="bankroll"
              label="Bankroll"
              variant="outlined"
              onChange={(event) => {
                setBankroll(event.target.value);
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
            <FormControl fullWidth sx={{ width: '100%' }}>
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
          </Stack>
          <Stack direction="row" spacing={4}>
            <Typography id="lives-label" align="left">
              Lives
            </Typography>
            <Slider
              id="lives-slider"
              label="Lives"
              value={lives}
              onChange={(_event, value) => {
                setLives(value);
              }}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={12}
              aria-labelledby="lives-label"
            />
          </Stack>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lives</TableCell>
                  <TableCell align="right">Optimal Bet</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <TableRow key={n}>
                    <TableCell>{n}</TableCell>
                    <TableCell align="right">{optimalBet(n)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" spacing={2} justifyContent="end">
            <Button
              variant="contained"
              id="calculate"
              onClick={() => {
                if (!isNumber(bankroll) || !isNumber(lives)) {
                  return;
                }
                setBankroll(parseFloat(bankroll) + optimalBet(lives));
              }}
            >
              Next Bet
            </Button>
          </Stack>
        </Stack>
        <Typography variant="h2" component="h2" marginBottom={2}>
          Values
        </Typography>
        <Stack direction="column" spacing={2}>
          <FormControl fullWidth sx={{ width: '100%' }}>
            <InputLabel id="win-odds-label">Win Odds</InputLabel>
            <Select
              labelId="win-odds-label"
              id="win-odds"
              value={winOdds}
              label="Win Odds"
              onChange={(event) => setWinOdds(event.target.value)}
              align="left"
            >
              <MenuItem value={18 / 37}>18/37</MenuItem>
              <MenuItem value={18 / 38}>18/38</MenuItem>
            </Select>
          </FormControl>
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
                    <TableCell align="right">
                      {((1 - winOdds) ** row.lives * 100).toFixed(3) + '%'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default App;