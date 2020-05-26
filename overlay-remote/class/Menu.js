// import modules
var inquirer = require('inquirer'); // menu
var LowerThird = require('./LowerThird');


module.exports = class Menu {
    constructor(object) {
        this.lowerThirdController;
        this.client;

    }

    mainmenu() {
        var module_this = this;

        console.reset();
        inquirer.prompt({
            type: 'list',
            name: 'mainmenu',
            message: 'Choose an option',
            choices: [
            'Lower-Third',
            'Quit'
            ]
        }).then(answers => {
            if(answers.mainmenu === 'Quit') {
                process.exit(0);
            }

            if(answers.mainmenu === 'Lower-Third') {
                module_this.lowerThird();
                return;
            }
        });
    }

    lowerThird() {
        console.reset();
        var module_this = this;

        inquirer.prompt({
            type: 'list',
            name: 'lowerThird',
            message: 'Choose an option',
            choices: [
                'Select Lower Third',
                'Add Lower Third',
                'Back to Main Menu'
            ]
        }).then(answers => {
            if(answers.lowerThird === 'Back to Main Menu') {
                module_this.mainmenu();
            }

            if(answers.lowerThird === 'Select Lower Third') {
                module_this.selectLowerThird();                
                return;
            }
            if(answers.lowerThird === 'Add Lower Third') {
                module_this.addLowerThird();
                return;
            }
        });
    }

    selectLowerThird() {
        var module_this = this;

        // build lowerThird choices
        var lowerThirdChoices = module_this.getLowerThirdsForQuery();
        
        lowerThirdChoices.push({
            name: 'Back',
            value: false
        });

        console.reset();
        inquirer.prompt({
            type: 'list',
            name: 'lowerThird',
            message: 'Which Lower Third do you want to use?',
            choices: lowerThirdChoices
        }).then(lowerThirdQuery => {
            if(lowerThirdQuery.lowerThird === false) {
                module_this.lowerThird();
                return;
            }
            
            var lowerThird = module_this.lowerThirdController.lowerThirds[lowerThirdQuery.lowerThird];
            console.reset();
            console.log('');
            console.log('Selected Lower Third:');
            console.log('---------------------');
            
            console.log('Name: ' + lowerThird.name);
            console.log('Description: ' + lowerThird.description);
            console.log('---------------------');
            console.log('');
            module_this.lowerThirdSelected(lowerThird,lowerThirdQuery.lowerThird);
        });
            
    }

    lowerThirdSelected(lowerThird,index) {
        var module_this = this;        

        inquirer.prompt({
            type: 'list',
            name: 'option',
            message: 'Choose an ACTION',
            choices: [
                'Show for 10 sec and hide afterwards',
                'Show',
                'Hide',
                'Delete Lower Third',
                'Back'
            ]
        }).then(answers => {
            if(answers.option === 'Back') {
                module_this.lowerThird();
            }
            
            if(answers.option === 'Show for 10 sec and hide afterwards') {
                console.log('Executed!');
                module_this.showLowerThird(lowerThird);
                setTimeout(function () {
                    module_this.hideLowerThird();
                },10*1000);
                module_this.lowerThirdSelected(lowerThird);
                return;
            }
            if(answers.option === 'Show') {
                console.log('Executed!');
                module_this.showLowerThird(lowerThird);
                module_this.lowerThirdSelected(lowerThird);
                return;
            }
            if(answers.option === 'Hide') {
                console.log('Executed!');
                module_this.hideLowerThird();
                module_this.lowerThirdSelected(lowerThird);
                return;
            }
            if(answers.option === 'Delete Lower Third') {
                module_this.deleteLowerThird(lowerThird,index);
                return;
            }
        });
    }
    
    addLowerThird() {
        var module_this = this;
        var newLowerThird = new LowerThird({});


        inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Enter Name:',
            default: 'Max Mustermann'
        }).then(answer => {
            newLowerThird.name = answer.name.trim();

            inquirer.prompt({
                type: 'input',
                name: 'description',
                message: 'Enter description:',
                default: ''
            }).then(answer => {
                newLowerThird.description = answer.description.trim();

                module_this.lowerThirdController.add(newLowerThird);

                console.log('');
                console.log('New Lower Third added:');
                console.log('---------------------');
                
                console.log('Name: ' + newLowerThird.name);
                console.log('Description: ' + newLowerThird.description);
                console.log('---------------------');
                console.log('');
                
                setTimeout(function () {
                    module_this.lowerThird();
                },2000);
            });
        });

    }
    
    deleteLowerThird(element, index) {
        var module_this = this;
        console.reset();
        
        console.log('');
        console.log('Lower Third deleted:');
        console.log('---------------------');
        
        console.log('Name: ' + element.name);
        console.log('Description: ' + element.description);
        console.log('---------------------');
        console.log('');

        module_this.lowerThirdController.deleteByIndex(index);
        
        setTimeout(function () {
            module_this.lowerThird();
        },2000);
    }

    showLowerThird(lowerThird) {
        client.emit('content',{
            'type':'lowerThird',
            'content': {
                action:'show',
                element:lowerThird
            },
        });
    }

    hideLowerThird() {
        client.emit('content',{
            'type':'lowerThird',
            'content': {
                action:'hide',
            },
        });
    }

    getLowerThirdsForQuery() {
        var module_this = this;

        var lowerThirdQuery = [];        
        for(var i=0;i<module_this.lowerThirdController.lowerThirds.length;i++) {
            var lowerThird = module_this.lowerThirdController.lowerThirds[i];

            lowerThirdQuery.push({
                name: lowerThird.name,
                value: i
            });
        }
        return lowerThirdQuery;
    }
    
};
