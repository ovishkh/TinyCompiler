const { compiler } = require('../TinyCompiler');

module.exports = (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    let code = '';

    // Handle both GET and POST requests
    if (req.method === 'GET') {
      code = req.query.code || '';
    } else if (req.method === 'POST') {
      code = req.body?.code || '';
    }

    if (!code) {
      return res.status(400).json({ 
        error: 'No code provided',
        usage: 'GET /api/compiler?code=(add 1 2) or POST with {"code": "(add 1 2)"}',
        success: false 
      });
    }

    const output = compiler(code);
    res.status(200).json({ 
      input: code, 
      output: output,
      success: true 
    });
  } catch (error) {
    res.status(400).json({ 
      error: error.message || 'Compilation error',
      success: false 
    });
  }
};
