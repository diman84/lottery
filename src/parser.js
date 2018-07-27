import { parse } from 'node-html-parser';
import * as csv from 'csv-writer';
import path from "path"
import fs from "then-fs"

let resFolder = path.join(__dirname, '..', 'results');
let dataFolder = path.join(__dirname, '..', 'data');

if (!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder);
}

let writer = csv.createObjectCsvWriter({
    path: path.join(dataFolder, 'data.csv'),
    header: [
        {id: 'draw', title: 'Тираж'},
        {id: 'serie', title: 'Серия'},
        {id: 'date', title: 'Дата'},
        {id: 'fieldA_1', title: 'Поле А'},
        {id: 'fieldA_2', title: ''},
        {id: 'fieldA_3', title: ''},
        {id: 'fieldA_4', title: ''},
        {id: 'fieldA_5', title: ''},
        {id: 'fieldA_6', title: ''},
        {id: 'fieldA_7', title: ''},
        {id: 'fieldA_8', title: ''},
        {id: 'fieldB', title: 'Поле Б'}
    ]
})

fs.readdir(resFolder, (err, files) => {
    let records = 
        files.map(file => {            
            let html = fs.readFileSync(path.join(resFolder, file), "utf8");
            let root = parse(html);
            let rows = root.querySelectorAll("table tr").slice(1);

            let recs = rows.map(row => {
                let drawRE = /((?:^)(\d+)(?:\b|\s))((?:(серия[\b\s]))(\d+)(\b|\s))((?:от[\b\s])(.*)$)/g;                
                let tds = row.querySelectorAll("td");
                let drawSection = tds[0];
                let groups = drawRE.exec(drawSection.text.trim());
                
                let resSection = tds[1];
                let textNodes = resSection.childNodes.filter(n => n.nodeType === 3 && n.text && n.text.trim());
                let fieldA = textNodes[0];
                let fieldB = textNodes[1];
                let a_res = fieldA.text.trim().split(',');
                let b_res = fieldB.text.trim();

                return {
                    draw: groups[2],
                    serie: groups[5],
                    date: groups[8],
                    fieldA_1: a_res[0],
                    fieldA_2: a_res[1],
                    fieldA_3: a_res[2],
                    fieldA_4: a_res[3],
                    fieldA_5: a_res[4],
                    fieldA_6: a_res[5],
                    fieldA_7: a_res[6],
                    fieldA_8: a_res[7],
                    fieldB: b_res
                }
            })

            return recs;           
        });

    writer.writeRecords(records.reduce((d1,d2) => d1.concat(d2), []))
            .then(() => {
                console.log('...Done');
            });
  })
