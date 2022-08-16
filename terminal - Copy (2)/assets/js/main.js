let commandUsed=[];

let help = [
    ["whois","Who is Aadarsh Kumar?"],
    ["projects", "View list of projects"],
    ["help", "View list of commands"],
    ["email", "Send an email to Aadarsh Kumar"],
    ["whatsapp", "Send a message to Aadarsh Kumar on Whatsapp"],
    ["socials", "View list of socials"],
    ["stack", "View list of technologies used in this project"],
    ["cd ..", "Go back to home page"]
]
let currentCommand;
let commandList='<table>';
help.forEach(command => {
    commandList+= `<tr><td><span class="command">${command[0]}</span><td><td> ${command[1]}<td></tr>`;
});
let output;

let portfolioData;

let wrongCommand = `Command not found. For a list of commands, type <span class="command">'help'</span>.`

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/ /g, '&nbsp;').replace(/\n/,'');
}

function printCommandLine(command){
    commandLine = document.createElement('p');
    commandLine.classList.add('command-line');
    commandLine.innerHTML = ` ${htmlEntities(command)}`;
    console.log(htmlEntities(command));
    return commandLine;
}
function printCommandOutput(output){
    outputElement = document.createElement('p');
    outputElement.classList.add('command-output');
    outputElement.innerHTML = output;
    return outputElement;
}
(window.onload = function() {
    let i=1;
    getPortfolioData();
    output = document.querySelector(".output");

    //focus textarea
    document.querySelector('body').addEventListener('click',(e)=>{
        document.querySelector('.cursor').classList.remove('hide-cursor')
        document.querySelector('textarea').focus();
        console.log('clicked');
    })


    textarea = document.querySelector('[name="command"]');
    typer = document.querySelector('.typer');
    textarea.addEventListener('keyup', function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            enteredCommand = textarea.value;
            if(enteredCommand != ""){
                textarea.value = "";
                typer.innerHTML = "";
                commandUsed.push(htmlEntities(enteredCommand));
                printCommandLine(commandUsed[commandUsed.length-1]);
                output.append(printCommandLine(enteredCommand));
                console.log(enteredCommand);
                result = outputData(commandUsed[commandUsed.length-1]);
                console.log(result);
                output.append(printCommandOutput(result));
                updateScroll();
            }
            currentCommand = commandUsed.length-1;
        }else if(e.keyCode === 38){
            if(e.repeat) {
                e.preventDefault()
            }else{
                if(commandUsed.length > 0){
                    console.log(commandUsed[currentCommand]);
                    console.log(currentCommand);
                    textarea.value = commandUsed[currentCommand];
                    typer.innerHTML = commandUsed[currentCommand];
                    currentCommand > 0 ? currentCommand-- : currentCommand = 0;

                }
            }
        }else if(e.keyCode === 40){
            if(e.repeat) {
                e.preventDefault()
            }else{
                if(commandUsed.length > 0){
                    console.log(commandUsed[currentCommand]);
                    console.log(currentCommand);

                    textarea.value = commandUsed[currentCommand];
                    typer.innerHTML = commandUsed[currentCommand];
                    currentCommand < commandUsed.length-1 ? currentCommand++ : currentCommand = commandUsed.length-1;
                }
            }
        }else{
            console.log(textarea.value);
            typer.innerHTML = textarea.value;
        }

    });
})();

function outputData(cmd){
    switch (cmd) {
        case "whois":
            console.log(portfolioData.data.about.about.text);
            return portfolioData.data.about.about.html
        case "projects": 
            return portfolioData.data.projects.map(project => `<a href="${project.websiteUrl}" target="_blank">${project.projectName} &#10146;</a>`).join('<br>');
        case "help":
            return commandList;
        case "email":
            return `Opening Mail : <a href='mailto:${portfolioData.data.about.email}'>${portfolioData.data.about.email} &#10146;</a>`;
        case "whatsapp":
            return `Opening Whatsapp : <a href='https://api.whatsapp.com/send?phone=${portfolioData.data.about.contactNumber}' target='_blank'>${portfolioData.data.about.contactNumber} &#10146;</a>`;
        case "socials":
            return portfolioData.data.socials.map(social => `<a href="${social.link}" target="_blank">${social.platform} &#10146;</a>`).join('<br>');
        case "stack":
            return portfolioData.data.project.techStack.html;
        case "cd&nbsp;..":
            location.href  =  "/index.html"
            return "going back to home.. ";
        case "clear":
            return output.innerHTML = "";
        default :
            return wrongCommand;
    }
}


function getPortfolioData(){
    let query = `{
        projects(first: 10) {
          websiteUrl
          projectName
        }
        about(where: {id: "cl3x9c2gj06oq0bplr6m0z96d"}) {
          about {
            html
          }
          email
          contactNumber
        }
        project(where: {id: "cl3yf048702f00co12w05saw3"}) {
          projectName
          techStack {
            html
          }
        }
      }
      
      `
    let projects;
    fetch('https://api-ap-south-1.graphcms.com/v2/cl3opwa3n6ixy01z13nmp05m5/master', {
        method: 'POST',
        body: JSON.stringify({
          query: query
        }),
        headers: {
            'content-type': 'application/json'
        }
      }).then(async (data) => {
          // Console log our return data
           portfolioData = await data.json();
           console.log(portfolioData);
      });
    
}


function updateScroll(){
    document.querySelectorAll('.command-output')[document.querySelectorAll('.command-output').length-1].scrollIntoView();
}
