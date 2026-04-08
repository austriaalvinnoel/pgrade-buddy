export default async function handler(req, res) {
  const { code } = req.query;
  
  if (!code) {
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      scope: 'repo,user',
    });
    return res.redirect(`https://github.com/login/oauth/authorize?${params}`);
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();
  
  const script = `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
          message.origin
        );
        window.removeEventListener('message', receiveMessage, false);
      };
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    </script>
  `;
  
  return res.send(script);
}
