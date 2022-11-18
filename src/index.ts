//import axios from 'axios'
import * as puppeteer from 'puppeteer';

import 'dotenv/config'
const username: any = process.env.LUCIOS_LOGIN;
const password: any = process.env.LUCIOS_PASS;
const url: any =  process.env.LUCIOS_URL;

(async (): Promise<void> => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  
    await page.goto(url)
    
    await page.type('#txtUsuario', username, {delay: 30})
    await page.type('#txtSenha', password, {delay: 30})
    await page.click('#btnLogin')
    await page.waitForNavigation()

    await page.click('#ctl00_cphMaster_lbFecharAbertura')

    await page.waitForSelector("#my_menu > div:nth-child(2) > a:nth-child(2)")


    await page.click("#my_menu > div:nth-child(2) > a:nth-child(2)")


    /**
     * Definindo o sistema de frete
     */
    await page.waitForSelector('#ctl00_cphMaster_ddlAtendimento', {timeout: 5000})

    await page.focus('#ctl00_cphMaster_ddlAtendimento')
    await page.click('#ctl00_cphMaster_ddlAtendimento')

    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter') 


    /**
     * Acesso a criação do pedido
     */
    await page.waitForSelector('#ctl00_cphMaster_btnIncluir', {timeout: 5000})

    await page.focus('#ctl00_cphMaster_btnIncluir')
    await page.click('#ctl00_cphMaster_btnIncluir')

    await page.waitForSelector('#ctl00_cphMaster_upItens')

    /**
     * Inserindo o código do produto 
     */
    
    await page.waitForSelector('#ctl00_cphMaster_txtOutrasRef', {visible: true, timeout: 3000 })
    await page.type("#ctl00_cphMaster_txtOutrasRef", '509094', {delay: 300})
    
    await page.keyboard.press('Enter')

    /**
     * Verificando se o codigo do produto é o mesmo (necessario regexp com a plataforma)
     */

    await page.waitForSelector('#ctl00_cphMaster_gvBusca_0',{visible: true, timeout:3000})

    await page.click('#ctl00_cphMaster_gvBusca_0')

    /**
     * Definindo a quantidade do produto
     */
    await page.waitForSelector('#ctl00_cphMaster_txtItemQtde', {visible: true, timeout:3000})
    await page.focus('#ctl00_cphMaster_txtItemQtde')
    await page.type('#ctl00_cphMaster_txtItemQtde', '012', {delay: 1000}) 

    await page.click('#ctl00_cphMaster_txtItemValTotal')

    /**
     * Salvando a compra
     */

    await page.waitForSelector('#ctl00_cphMaster_btnItemSalvar', {visible: true, timeout:300})

    await page.click('#ctl00_cphMaster_btnItemSalvar')

    /**
     * Finalizando a compra 
     */

    await page.waitForSelector('#ctl00_cphMaster_btnSalvarPedido')

    await page.click('#ctl00_cphMaster_btnSalvarPedido')



  
    await browser.disconnect()
})()

//