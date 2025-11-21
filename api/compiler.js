const { compiler } = require('../TinyCompiler');

module.exports = (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'No code provided. Usage: /api/compiler?code=(add 1 2)' });
    }

    const output = compiler(code);
    res.status(200).json({ 
      input: code, 
      output: output,
      success: true 
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      success: false 
    });
  }
};
