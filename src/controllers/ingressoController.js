const { get } = require("http");
const ingressoModel = require("../models/ingressoModel");

const getAllIngressos = async (req, res) => {
    try {
        const ingressos = await ingressoModel.getIngressos();
        res.json(ingressos);
    } catch (error) {
        res.status(404).json({message: "Erro ao buscar todos os ingressos"});
    }
};

const getIngresso = async (req,res) => {
    try {
        const ingresso = await ingressoModel.getIngressoById(req.params.id);
        if (!ingresso) {
        return res.status(404).json({message: "Erro ao buscar ingresso"});
    }
        res.json(ingresso);
    }catch (error) {
        res.status(500).json({message: "Erro ao buscar ingresso"});
    }
};

const createIngresso = async (req, res) => {
    try {
        const { evento, local_evento, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const newIngresso = await ingressoModel.createIngresso(evento, local_evento, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({message: "Ingresso já cadastrado"});
        }
        res.status(500).json({ message: "Erro ao criar ingresso"});
    }
};

const updateIngresso = async (req, res) => {
    try {
        const { quantidade_disponivel } = req.body;
        const updatedIngresso = await ingressoModel.updateIngresso(req.params.id, quantidade_disponivel);
        if (!updatedIngresso){
            return res.status(404).json({message: "ingresso não encontrado"});
        };
        res.json(updatedIngresso);
    } catch (error){
        res.status(500).json({message: "Erro ao atualizar ingresso"});
    }
};

const deleteIngresso = async (req, res) => {
    try {
        const message = await ingressoModel.deleteIngresso(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({message: "Erro ao deletar ingresso"});
    }
};

const vendaIngresso = async (req, res) => {
    try {
        const { id, quantidade } = req.body;
        const updatedIngresso = await ingressoModel.vendaIngresso(id, quantidade);
        res.json({message: "Ingresso vendido com sucesso", ingresso: updatedIngresso});
    } catch (error) {
        res.status(500).json({message: "Erro ao vender ingresso"});
}
};
module.exports = { getAllIngressos, getIngresso, createIngresso, updateIngresso, deleteIngresso, vendaIngresso };