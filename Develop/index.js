const inquirer=require('inquirer');
const fs=require('fs');
const questions = ['Title of the project: ',"Description: ","Installation Instructions: ","License: ","Usage Information: ","Contribution Guidelines: ","Test Instructions: ","Link to github profile: ","Email Address"];
// The badges for the licenses. 
const licenses = {
'Apache 2.0 License':{badge:'[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)', desc:'descplaceholder'},
'Boost Software License 1.0':{badge:'[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)', desc:'descplaceholder'},
'BSD 3-Clause License':{badge:'[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)', desc:'descplaceholder'},
'BSD 2-Clause License':{badge:'[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)', desc:'descplaceholder'},
'CC0':{badge:'[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)', desc:'descplaceholder'},
'CC Attribution 4.0':{badge:'[![License: CC BY 4.0](https://licensebuttons.net/l/by/4.0/80x15.png)](https://creativecommons.org/licenses/by/4.0/)', desc:'descplaceholder'},
'CC Attribution-ShareAlike 4.0':{badge:'[![License: CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-sa/4.0/)', desc:'descplaceholder'},
'CC Attribution-NonCommercial 4.0':{badge:'[![License: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc/4.0/)', desc:'descplaceholder'},
'CC Attribution-NoDerivates 4.0':{badge:'[![License: CC BY-ND 4.0](https://licensebuttons.net/l/by-nd/4.0/80x15.png)](https://creativecommons.org/licenses/by-nd/4.0/)', desc:'descplaceholder'},
'CC Attribution-NonCommmercial-ShareAlike 4.0':{badge:'[![License: CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)', desc:'descplaceholder'},
'CC Attribution-NonCommercial-NoDerivatives 4.0':{badge:'[![License: CC BY-NC-ND 4.0](https://licensebuttons.net/l/by-nc-nd/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/)', desc:'descplaceholder'},
'Eclipse Public License 1.0':{badge:'[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)', desc:'descplaceholder'},
'GNU GPL v3':{badge:'[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)', desc:'descplaceholder'},
'GNU GPL v2':{badge:'[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)', desc:'descplaceholder'},
'GNU AGPL v3':{badge:'[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)', desc:'descplaceholder'},
'GNU LGPL v3':{badge:'[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)', desc:'descplaceholder'},
'GNU FDL v1.3':{badge:'[![License: FDL 1.3](https://img.shields.io/badge/License-FDL_v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)', desc:'descplaceholder'},
'The Hippocratic License 2.1':{badge:'[![License: Hippocratic 2.1](https://img.shields.io/badge/License-Hippocratic_2.1-lightgrey.svg)](https://firstdonoharm.dev)', desc:'descplaceholder'},
'The Hippocratic License 3.0':{badge:'[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)', desc:'descplaceholder'},
'IBM Public License Version 1.0':{badge:'[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)', desc:'descplaceholder'},
'ISC License (ISC)':{badge:'[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)', desc:'descplaceholder'},
'The MIT License':{badge:'[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)', desc:'descplaceholder'},
'Mozilla Public License 2.0':{badge:'[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)', desc:'descplaceholder'},
'Attribution License (BY)':{badge:'[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)', desc:'descplaceholder'},
'Open Database License (ODbL)':{badge:'[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)', desc:'descplaceholder'},
'Public Domain Dedication and License (PDDL)':{badge:'[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)', desc:'descplaceholder'},
'The Perl License':{badge:'[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)', desc:'descplaceholder'},
'The Artistic License 2.0':{badge:'[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)', desc:'descplaceholder'},
'SIL Open Font License 1.1':{badge:'[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)', desc:'descplaceholder'},
'The Unlicense':{badge:'[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)', desc:'descplaceholder'},
'The Do What the Fuck You Want to Public License':{badge:'[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)', desc:'The Do What The Fuck You Want To Public License (WTFPL) is a free software license.'},
'The zlib/libpng License':{badge:'[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)', desc:'descplaceholder'}};

//Creates the README
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data,function (err) {
        if (err) throw err;
      console.log('File Created!');
      });
}

//Uses inquirer to ask the questions and write them to the README through the writeToFile command
function init() {
    inquirer.prompt([{
        name: 'Q0',
        message: questions[0],
        type:'input'
    },{
        name: 'Q1',
        message: questions[1],
        type:'input' 
    },{
        name: 'Q2',
        message: questions[2],
        type:'input' 
    },{
        name: 'Q3',
        message: questions[3],
        type:'list',
        choices:['Apache 2.0 License','Boost Software License 1.0','BSD 3-Clause License','BSD 2-Clause License','CC0','CC Attribution 4.0','CC Attribution-ShareAlike 4.0','CC Attribution-NonCommercial 4.0', 'CC Attribution-NoDerivates 4.0','CC Attribution-NonCommmercial-ShareAlike 4.0','CC Attribution-NonCommercial-NoDerivatives 4.0','Eclipse Public License 1.0','GNU GPL v3','GNU GPL v2','GNU AGPL v3','GNU LGPL v3','GNU FDL v1.3','The Hippocratic License 2.1','The Hippocratic License 3.0','IBM Public License Version 1.0','ISC License (ISC)','The MIT License','Mozilla Public License 2.0','Attribution License (BY)','Open Database License (ODbL)','Public Domain Dedication and License (PDDL)','The Perl License','The Artistic License 2.0','SIL Open Font License 1.1','The Unlicense','The Do What the Fuck You Want to Public License','The zlib/libpng License']
    },{
        name: 'Q4',
        message: questions[4],
        type:'input' 
    },{
        name: 'Q5',
        message: questions[5],
        type:'input' 
    },{
        name: 'Q6',
        message: questions[6],
        type:'input' 
    },{
        name: 'Q7',
        message: questions[7],
        type:'input' 
    },{
        name: 'Q8',
        message: questions[8],
        type:'input' 
    }])
    .then(function(answer){
        const templicensedec=answer.Q3;
        writeToFile(`README.md`, 
`# `+answer.Q0+`       `+licenses[answer.Q3].badge+`
## Description 
`+answer.Q1+`
## Table of Contents 
[Description](#description)
[Installation](#installation)
[Usage Information](#usage-information)
[Contribution Guidelines](#contribution-guidelines)
[Testing Instructions](#testing-instructions)
[License](#license)
[Questions](#questions)
## Installation 
`+answer.Q2+`
## Usage Information 
`+answer.Q4+`
## Contribution Guidelines 
`+answer.Q5+`
## Testing Instructions 
`+answer.Q6+`
## License
`+answer.Q3+`
## Questions 
[Github](`+answer.Q7+`)
[E-Mail](`+answer.Q8+`)`
            )
    })
};

// Function call to initialize app
init();
