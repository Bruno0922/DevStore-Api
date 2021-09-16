import db from './db.js';
import express from 'express'
import cors from 'cors'


const app = express();
app.use(cors());
app.use(express.json());

app.get('/produto', async (req, resp) => {
    try{
        let produt = await db.tb_produto.findAll({ order: [['id_produto', 'desc']] });
        resp.send(produt);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }

})

app.post('/produto', async (req, resp) => {
    try {
        let { nproduto, categoria, preco_de, preco_por, avaliacao, dsproduto, estoque, imgproduto, ativo, inclusao} = req.body;

        let r = await db.tb_produto.create({
            nm_produto: nproduto,
            ds_categoria: categoria,
            vl_preco_de: preco_de,
            vl_preco_por: preco_por,
            vl_avaliacao: avaliacao,
            ds_produto: dsproduto,
            qtd_estoque: estoque,
            img_produto: imgproduto,
            bt_ativo: ativo,
            dt_inclusao: inclusao
        })
        resp.send(r);

    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.put('/produto/:id', async (req, resp) => {
    try {
        let { nproduto, categoria, preco_de, preco_por, avaliacao, dsproduto, estoque, imgproduto, ativo, inclusao} = req.body;
        let { id } = req.params;

        let r = await db.tb_produto.update(
            {
                nm_produto: nproduto,
                ds_categoria: categoria,
                vl_preco_de: preco_de,
                vl_preco_por: preco_por,
                vl_avaliacao: avaliacao,
                ds_produto: dsproduto,
                qtd_estoque: estoque,
                img_produto: imgproduto,
                bt_ativo: ativo,
                dt_inclusao: inclusao 
                
        },
        {
            where: { id_produto: id }

        }
        )
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString ()})
    }
})

app.delete('/produto/:id', async (req, resp) => {
    try {
        let { id } = req.params;

        let r = await db.tb_produto.destroy({ where: { id_produto: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})




app.listen(process.env.PORT, x => console.log(`Server up at port ${process.env.PORT}`))