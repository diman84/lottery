import fs from 'then-fs';
import * as request from "request-promise-native";
import "url";
import php from "php-unserialize";
import js from "php-serialize";
import path from "path"
import "./delay"
import { delayPromise } from './delay';



Promise.all(Array(1410).fill().forEach((x,i) => {
    let draw = (i + 1).toString();
    let req = js.serialize({
        source: 'O:9:"front_api"' + js.serialize({
                result: {
                    values: {
                        date: '',
                        draw_id: draw
                    }
                }
            }).substring(1),
        className: "front_api",
        method: "xroute",
        arguments: js.serialize([{
            catalog: {
                archive_results: {
                    ancestor: '',
                    date: '', //26.07.2018
                    draw_id: draw,
                    draw_serie: null,
                    flag: 'draw'
                }
            }
        }])
    })
    return delayPromise(i * 1000 + 1000)
            .then(() => 
                request.post('http://www.blits.by/_run.php?xoadCall=true', {
                    body: req,
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'text/plain; charset=UTF-8'
                    }
                })
                .then(res => {
                    var resp, filePath = path.join(__dirname, '..', 'results', draw + '.html');
                    eval("resp = " + res);
                    fs.writeFile(filePath, `<html><head><title>${draw}</title></head><body>${resp.returnObject.result.table}</body></html>`)
                        .then(f => console.log('file written to: ' + filePath));
                })
                .catch(err => {
                    console.log(err);
                }))
    }))
    .then(x => console.log('success'));

//  let obj = php.unserialize('a:4:{s:6:"source";s:206:"O:9:"front_api":1:{s:6:"result";a:1:{s:6:"values";a:5:{s:7:"draw_id";s:4:"1410";s:10:"draw_serie";s:6:"321425";s:6:"grid_a";s:21:"6,9,10,12,15,16,17,19";s:6:"grid_b";s:1:"3";s:4:"date";s:10:"26.07.2018";}}}";s:9:"className";s:9:"front_api";s:6:"method";s:6:"xroute";s:9:"arguments";s:189:"a:2:{i:0;a:1:{s:7:"catalog";a:1:{s:15:"archive_results";a:5:{s:7:"draw_id";s:4:"1410";s:10:"draw_serie";N;s:8:"ancestor";s:0:"";s:4:"date";s:10:"26.07.2018";s:4:"flag";s:4:"draw";}}}i:1;N;}";}');
//  let source  = php.unserialize(obj.source.replace('O:9:"front_api"', 'a'));
//  console.log(source);
// let args  = php.unserialize(obj.arguments);
