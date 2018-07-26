import fs from 'then-fs';
import * as request from "request-promise-native";
import "url";
import php from "js-php-serialize";

// request.post('http://www.blits.by/_run.php', {
//             body: {

//             },
//             headers: {
//                 'Content-Type': 'text/plain'
//             }
//         })
//         .then(res => fs.writeFile())

console.log(php.unserialize('a:4:{s:6:"source";s:206:"O:9:"front_api":1:{s:6:"result";a:1:{s:6:"values";a:5:{s:7:"draw_id";s:4:"1410";s:10:"draw_serie";s:6:"321425";s:6:"grid_a";s:21:"6,9,10,12,15,16,17,19";s:6:"grid_b";s:1:"3";s:4:"date";s:10:"26.07.2018";}}}";s:9:"className";s:9:"front_api";s:6:"method";s:6:"xroute";s:9:"arguments";s:189:"a:2:{i:0;a:1:{s:7:"catalog";a:1:{s:15:"archive_results";a:5:{s:7:"draw_id";s:4:"1410";s:10:"draw_serie";N;s:8:"ancestor";s:0:"";s:4:"date";s:10:"26.07.2018";s:4:"flag";s:4:"draw";}}}i:1;N;}";}'))