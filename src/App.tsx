import './App.css';
import { useEffect, useState } from 'react';
import TimeCalculator from './TimeCalculator';

function App() {

  const [buninyong, setBuninyong] = useState('')
  const [fedUniInbound, setFedUniInbound] = useState('')
  const [fedUniOutbound, setFedUniOutbound] = useState('')
  const [ballarat, setBallarat] = useState('')

  useEffect(() => {
    setTimeout(async () => {
      let tc = new TimeCalculator();
      setBuninyong(tc.next(1, 1));
      setFedUniInbound(tc.next(0, 1));
      setFedUniOutbound(tc.next(0, 0));
      setBallarat(tc.next(2, 0));
    }, 1000);
  });


  return (
    <div className="App">
      <header className="App-header">
      <h2>Route 21 Arrival Countdown</h2>
        <p>Next Bus based on <a href="https://d309ul1fvo6zfp.cloudfront.net/1645069629968/bus-15169-2021-12-19-2022-12-31.pdf" target="_blank" rel="noreferrer">timetable</a></p>
        <table>
          <thead>
            <tr>
              <th className="c1">Bus Stop</th>
              <th className="c2">Direction</th>
              <th className="c3">Next</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="c1">Buninyong (terminus)</td>
              <td className="c2">Inbound</td>
              <td className="c3">
                  {buninyong}
              </td>
            </tr>
            <tr>
              <td className="c1">Fed Uni</td>
              <td className="c2">Inbound</td>
              <td className="c3">
                {fedUniInbound}
              </td>
            </tr>
            <tr>
              <td className="c1">Fed Uni</td>
              <td className="c2">Outbound</td>
              <td className="c3">
                {fedUniOutbound}
              </td>
            </tr>
            <tr>
              <td className="c1">Ballarat Interchange</td>
              <td className="c2">Outbound</td>
              <td className="c3">
                {ballarat}
              </td>
            </tr>
          </tbody>
        </table>
        <footer>
        <p>by <a href="https://severalpens.com">severalpens.com</a></p>
        </footer>
        <div className='source-code'>
          <p>Source code: <a href="https://github.com/severalpens/route21v5">GitHub</a></p>
        </div>
      </header>
    </div>
  );
}

export default App;
