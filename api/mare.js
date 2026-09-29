const crypto = require('crypto');

const SEGREDO = process.env.SEGREDO || 'troque-isto-no-painel-da-vercel-23';
const ESPERA_MS = 7 * 60 * 1000;
const PALAVRA = 'portfolio';

function assinar(ts) {
  return crypto.createHmac('sha256', SEGREDO).update(String(ts)).digest('hex').slice(0, 32);
}

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const agora = Date.now();
  const token = String((req.query && req.query.t) || '');
  const [ts, sig] = token.split('.');

  if (!ts || !sig || assinar(ts) !== sig) {
    return res.status(200).json({ t: agora + '.' + assinar(agora), p: 0 });
  }

  const passou = agora - Number(ts);
  if (passou >= ESPERA_MS) {
    return res.status(200).json({ t: token, p: 1, palavra: PALAVRA });
  }
  res.status(200).json({ t: token, p: passou / ESPERA_MS });
};
