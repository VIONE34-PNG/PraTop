const BASE_URL = "http://192.168.1.2:8080";

async function handleRequest(url, options) {
    try {
        const response = await fetch(url, options);
        console.log(response);

        // 🔧 Ajuste principal: tratamento correto de erros JSON
        if (!response.ok) {
            const contentType = response.headers.get("Content-Type");
            
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                return { error: errorData.erro || errorData.error || "Erro desconhecido no servidor." };
            } else {
                const errorMessage = await response.text();
                return { error: errorMessage || "Erro de comunicação com o servidor." };
            }
        }

        // 🔧 Continua igual: se for JSON, retorna objeto
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        // 🔧 Caso raro: se for texto, retorna texto
        return await response.text();

    } catch (error) {
        return { error: "Erro de conexão: " + error.message };
    }
}

// 🧠 Login padrão
export async function login(dadosCliente) {
    const url = `${BASE_URL}/auth/login`;
    return await handleRequest(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosCliente)
    });
}

// 📨 Envio de token
export async function enviarToken(email) {
    const url = `${BASE_URL}/user/envia-token?email=${email}`;
    return await handleRequest(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }
    });
}

// 🔒 Verificar token
export async function verificarToken(dados) {
    const url = `${BASE_URL}/user/verifica-token`;
    return await handleRequest(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(dados).toString(),
    });
}

// 🧾 Cadastro de conta
export async function cadastrarConta(dadosCliente) {
    const url = `${BASE_URL}/user/cadastrar`;
    return await handleRequest(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosCliente)
    });
}

// 🔐 Cadastro de nova senha
export async function cadastrarNovaSenha(dados) {
    const url = `${BASE_URL}/user/reset-password`;
    return await handleRequest(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(dados).toString(),
    });
}

// 🔍 Buscar usuário pelo token
export async function buscarPorToken(token) {
    const url = `${BASE_URL}/user/buscaPorToken`;
    return await handleRequest(url, {
        method: "GET",
        headers: { 
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded' 
        }
    });
}
