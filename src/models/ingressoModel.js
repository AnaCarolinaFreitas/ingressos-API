const pool = require("../config/database");

const getIngressos = async () => {
    const result = await pool.query("SELECT * FROM ingressos");
    return result.rows;
};

const getIngressoById = async (id) => {
    const result = await pool.query("SELECT * FROM ingressos WHERE id = $1", [id]);
    return result.rows[0];
};

const createIngresso = async (evento, local_evento, data_evento, categoria, preco, quantidade_disponivel) => {
    const result = await pool.query(
        "INSERT INTO ingressos (evento, local_evento, data_evento, categoria, preco, quantidade_disponivel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [evento, local_evento, data_evento, categoria, preco, quantidade_disponivel]
    );
    
    if (categoria == "Pista" && preco < 100) {
        return {error: "Ingresso de pista não pode custar menos de 100 reais"};
    }

    if (categoria == "VIP" && preco < 200) {
        return {error: "Ingresso de VIP não pode custar menos de 200 reais"};
    }

    if (categoria == "Camarote" && preco < 300) {
        return {error: "Ingresso de camarote não pode custar menos de 300 reais"};
    }

    if (categoria == "Arquibancada" && preco > 80) {
        return {error: "Ingresso de Arquibancada não pode custar mais de 80 reais"};
    }
    return result.rows[0];
};

const updateIngresso = async (id, quantidade_disponivel) => {
    const result = await pool.query(
        "UPDATE ingressos SET quantidade_disponivel = $1 WHERE id = $2 RETURNING *",
        [quantidade_disponivel, id]
    );
    return result.rows[0];
};

const deleteIngresso = async (id) => {
    const result = await pool.query("DELETE FROM ingressos WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Ingresso não encontrado" };
    }
    return { error: "Ingresso deletado com sucesso"}
};

const vendaIngresso = async (id, quantidade) => {
    const ingresso = await getIngressoById(id);
    if (!ingresso){
        return { error: "Ingresso não encontrado para venda" };
    }

    if (ingresso.quantidade_disponivel <= 0) {
        return { error: "Ingressos para esse evento foram esgotados" };
    }
     
     const result = await pool.query(
         "UPDATE ingressos SET quantidade_disponivel = $1 WHERE id = $2 RETURNING *",
         [ingresso.quantidade_disponivel - quantidade, id]
     );
     return result.rows[0];
 }
 

module.exports = { getIngressos, getIngressoById, createIngresso, updateIngresso, deleteIngresso, vendaIngresso };


