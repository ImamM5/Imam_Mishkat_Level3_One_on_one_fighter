function initialize()
            {
                //original stats
                pStr=6;
                pFa=30;
                pSpe=6;
                pCu=6;

                eStr=6;
                eFa=30;
                eSpe=6;
                eCu=6;



                //initialize all of the stats variables
                pFatigue = document.querySelector("#pfa");
                pStrength = document.querySelector("#pst");
                pCunning = document.querySelector("#pcu");
                pSpeed = document.querySelector("#pSpeed");
                
                eFatigue = document.querySelector("#efa");
                eStrength = document.querySelector("#est");
                eCunning = document.querySelector("#ecu");
                eSpeed = document.querySelector("#eSpeed");
                

                playerCharacter = localStorage.getItem('playerCharacter');
                enemyCharacter = localStorage.getItem('enemyCharcater');

                playerCImg = document.getElementById("playerImg");
                enemyCImg = document.getElementById("enemyImg");
                pNameHB = document.getElementById("pNameHealth");
                eNameHB = document.getElementById("eNameHealth");
                playerStatsTitle = document.getElementById("pStatsTitle");
                enemyStatsTitle = document.getElementById("eStatsTitle");
                playerLogTitle = document.getElementById("pLogTitle");
                enemyLogTitle = document.getElementById("eLogTitle");
                playerLogPanel = document.getElementById("pLoglist");
                enemyLogPanel = document.getElementById("eLoglist");
                ultButton = document.getElementById("ultBtn");
                attackButton = document.getElementById("attackBtn");
                defendButton = document.getElementById("defendBtn");


                //buttons' value
                pAttack=0;
                pDefend=0;
                pUltimate=0;
                isPAttacking=false;
                isPDefending=false;
                isPUltimating =false;
                gameOver = false;

                eAttack=0;
                eDefend=0;
                eUltimate=0;
                isEAttacking=false;
                isEDefending=false;
                isEUltimating =false;

                //original fatigue values
                oPFatigue=0;
                oEFatgiue=0;


                if (playerCharacter === "kafka")
                {
                    playerCImg.src = "../images/kafka.jpg";
                    enemyCImg.src = "../images/link.jpg"
                }
                if (playerCharacter ==="link")
                {
                    playerCImg.src = "../images/link.jpg";
                    enemyCImg.src = "../images/kafka.jpg"

                    

                }
                
                pStatsIntitialize();
                eStatsIntitialize();
                storeOriginalValues();
                display();
                console.log(`${playerCharacter} ${enemyCharacter}`);
            }

            //basic display functions
            function display()
            {
                pNameHB.innerHTML = `${playerCharacter.toUpperCase()} (${pFa})`;
                eNameHB.innerHTML = `${enemyCharacter.toUpperCase()}  (${eFa})`;

                //displays the ult button if conditions match, gameOver checks if the game is over or not
                if ((Math.floor(pFa/eFa)>=2 || eFa < 0) && !gameOver)
                {
                    ultButton.style.display = 'block';
                    ultButton.style.backgroundColor= 'rgb(97, 22, 22)';
                    ultButton.style.height = '150px';
                    ultButton.style.width = '150px';
                    ultButton.style.borderRadius = '50%';  
                }
                else //else removes the ult button
                {
                    ultButton.style.display='none';
                }

                displayPStats();
                displayEstats();
                displaylogsT();

                (() => {
                    console.log(`${pUltimate}, ${eDefend}, ${gameOver}`);
                })();
            }

            const displayPStats = () => {
                playerStatsTitle.innerHTML = `${playerCharacter.toUpperCase()}'s Stats`;
                pFatigue.innerHTML = pFa;
                pSpeed.innerHTML = pSpe;
                pStrength.innerHTML = pStr;
                pCunning.innerHTML = pCu;
            };

            const displaylogsT = () => {
                enemyLogTitle.innerHTML = `${enemyCharacter.toUpperCase()}'s Logs`;
                playerLogTitle.innerHTML = `${playerCharacter.toUpperCase()}'s Logs`;
            };
            
            const displayEstats = () => {
                enemyStatsTitle.innerHTML = `${enemyCharacter.toUpperCase()}'s Stats`;
                eFatigue.innerHTML = eFa;
                eSpeed.innerHTML = eSpe;
                eStrength.innerHTML = eStr;
                eCunning.innerHTML = eCu;
            };

            //buttons 
            function Attack()
            {
                isPAttacking = true;
                playerLogPanel.innerHTML += `${playerCharacter.toUpperCase()} used attack. <br>`
                gamePlay();
            }

            function Defend()
            {
                isPDefending = true;
                playerLogPanel.innerHTML += `${playerCharacter.toUpperCase()} used defend. <br>`
                gamePlay();

            }

            function Ultimate()
            {
                isPUltimating = true;
                playerLogPanel.innerHTML += `${playerCharacter.toUpperCase()} used ULTIMATE!! <br>`
                gamePlay();
            }


            //game functions

            function storeOriginalValues()
            {
                oEFatgiue = eFa; //original enemy fatigue
                oPFatigue = pFa; //original player fatigue

            }

            function pStatsIntitialize()
            {

                let ranIncreaseVal_1 = 0;
                let ranIncreaseVal_2 = 0;
                let ranDecreaseVal_1 = 0;
                let ranDecreaseVal_2 = 0;

                while (ranDecreaseVal_1 === ranDecreaseVal_2 || ranIncreaseVal_1 === ranIncreaseVal_2)
                {
                    ranIncreaseVal_1 = Math.floor((Math.random()*4)+1);
                    ranIncreaseVal_2 = Math.floor((Math.random()*4)+1);
                    ranDecreaseVal_1 = Math.floor((Math.random()*4)+1);
                    ranDecreaseVal_2 = Math.floor((Math.random()*4)+1);
                }   

                //sets random decrease val
                if (ranDecreaseVal_1 ===1)
                {
                    pStr-= Math.floor(Math.random() * 2);
                }
                else if (ranDecreaseVal_1 ===2)
                {
                    pCu -= Math.floor(Math.random() * 2);
                }
                else if (ranDecreaseVal_1 ===3)
                {
                    pSpe -= Math.floor(Math.random() * 2);
                }
                else if (ranDecreaseVal_1 ===4)
                {
                    pFa -= Math.floor(Math.random() * 7);
                }

                //sets random increase val
                if (ranIncreaseVal_1 ===1)
                {
                    pStr+= Math.floor(Math.random() * 2);
                }
                else if (ranIncreaseVal_1 ===2)
                {
                    pCu += Math.floor(Math.random() * 2);
                }
                else if (ranIncreaseVal_1 ===3)
                {
                    pSpe += Math.floor(Math.random() * 2);
                }
                else if (ranIncreaseVal_1 ===4)
                {
                    pFa += Math.floor(Math.random() * 7);
                }
            }
            function eStatsIntitialize()
            {

                /*stength = 1, cunning = 2, speed = 3, fatigue = 4*/
                let ranIncreaseVal_1 = 0;
                let ranIncreaseVal_2 = 0;
                let ranDecreaseVal_1 = 0;
                let ranDecreaseVal_2 = 0;

                while (ranDecreaseVal_1 === ranDecreaseVal_2 || ranIncreaseVal_1 === ranIncreaseVal_2)
                {
                    ranIncreaseVal_1 = Math.floor((Math.random()*4)+1);
                    ranIncreaseVal_2 = Math.floor((Math.random()*4)+1);
                    ranDecreaseVal_1 = Math.floor((Math.random()*4)+1);
                    ranDecreaseVal_2 = Math.floor((Math.random()*4)+1);
                }   

                //sets random decrease val
                if (ranDecreaseVal_1 ===1)
                {
                    eStr-= Math.floor(Math.random() * 2);
                }
                else if (ranDecreaseVal_1 ===2)
                {
                    eCu -= Math.floor(Math.random() * 2);
                }
                else if (ranDecreaseVal_1 ===3)
                {
                    eSpe -= Math.floor(Math.random() * 2);
                }
                else if (ranDecreaseVal_1 ===4)
                {
                    eFa -= Math.floor(Math.random() * 7);
                }

                //sets random increase val
                if (ranIncreaseVal_1 ===1)
                {
                    eStr+= Math.floor(Math.random() * 2);
                }
                else if (ranIncreaseVal_1 ===2)
                {
                    eCu += Math.floor(Math.random() * 2);
                }
                else if (ranIncreaseVal_1 ===3)
                {
                    eSpe += Math.floor(Math.random() * 2);
                }
                else if (ranIncreaseVal_1 ===4)
                {
                    eFa += Math.floor(Math.random() * 7);
                }

            }

            function gamePlay()
            {
                chooseAImove();


                pAttack =Math.floor((pStr+pSpe+pCu)/Math.floor((Math.random()*3)+1)); //players attack value
                pDefend =pSpe+Math.floor((Math.random()*6)+1); //sets players defense
                pUltimate = Math.floor((pStr+pSpe)/Math.floor((Math.random()*3)+1));

                eAttack = Math.floor((eStr+eSpe+eCu)/Math.floor((Math.random()*3)+1)); //sets ai's attack power
                eDefend = eSpe+Math.floor((Math.random()*6)+1); //sets ais defense
                eUltimate = Math.floor((eStr+eSpe)/Math.floor((Math.random()*3)+1));

                if (isPAttacking)
                {
                    let modifyFa = pAttack-eDefend;
                    let randomFa = Math.floor((Math.random()*6)+1);
                    if (pAttack < eDefend && isEDefending && eFa <oEFatgiue) //if player attack is less than enemy defense and enemy is defending
                    {
                        if (eFa + randomFa <= oEFatgiue)
                        {
                            eFa += randomFa;
                        }
                    }
                    else if (pAttack > eDefend)
                    {
                        eFa -= modifyFa
                    } 
                }
                

                pDefend = isPDefending ? pSpe + pCu : pDefend;

                if (isEAttacking) // if ai is attacking
                {
                    let modifyFa = eAttack-pDefend;
                    let randomFa = Math.floor((Math.random()*6)+1);
                    if (eAttack < pDefend && isPDefending && pFa <oPFatigue) //if enemy attack is less than player defense and player is defending
                    {
                        if (pFa + randomFa <= oPFatigue)
                        {
                            pFa += randomFa;
                        }
                    }
                    else if (eAttack > pDefend)
                    {
                        pFa -= modifyFa;
                    } 
                    enemyLogPanel.innerHTML += `${enemyCharacter.toUpperCase()} used attack. <br>`//adds to log
                }

                eDefend = isEDefending ? eSpe + eCu : eDefend;
                if (isEDefending) {
                    enemyLogPanel.innerHTML += `${enemyCharacter.toUpperCase()} used defend. <br>`;
                }


                if (isPDefending && isEDefending) //if both players are defending
                {
                    let randomFa = Math.floor((Math.random()*6)+1);
                    if (pFa + randomFa <= oPFatigue) //checks
                    {
                            pFa += randomFa;
                    }
                    if (eFa + randomFa <= oEFatgiue) //checks
                    {
                            eFa += randomFa;
                    }
                    
                }

                if (isEUltimating)
                {
                    enemyLogPanel.innerHTML += `${enemyCharacter.toUpperCase()} used ULTIMATE!! <br>`//adds to log
                    let modifyFa = eAttack-pDefend;
                    let randomFa = Math.floor((Math.random()*6)+1);
                    if (eUltimate < pDefend && isPDefending && pFa <oPFatigue) //if enemy attack is less than player defense and player is defending
                    {
                        if (pFa + randomFa <= oPFatigue)
                        {
                            pFa += randomFa;
                        }
                    }
                    else if (eUltimate > pDefend)
                    {
                        pFa -= modifyFa;
                        alert(`${enemyCharacter.toUpperCase()} won the game, refresh to play again.`)
                        enemyLogPanel.innerHTML += `${enemyCharacter.toUpperCase()} WON!! <br>`;
                        playerLogPanel.innerHTML += `${playerCharacter.toUpperCase()} LOST!! <br>`;
                        attackButton.style.display = 'none';
                        defendButton.style.display = 'none';
                        //ultbutton is removed on display()
                        gameOver = true;
                    } 
                    isEUltimating= false; //sets this to false when done ultimating
                   
                }
                else if (isPUltimating)
                {
                    let modifyFa = pAttack-eDefend;
                    let randomFa = Math.floor((Math.random()*6)+1);
                    if (pUltimate < eDefend && isEDefending && eFa <oEFatgiue) //if player attack is less than enemy defense and enemy is defending
                    {
                        if (eFa + randomFa <= oEFatgiue)
                        {
                            eFa += randomFa;
                        }
                    }
                    else if (pUltimate > eDefend)
                    {
                        eFa -= modifyFa
                        alert(`${playerCharacter.toUpperCase()} won the game! Refresh to play again.`);
                        playerLogPanel.innerHTML += `${playerCharacter.toUpperCase()} WON!! <br>`;
                        enemyLogPanel.innerHTML += `${enemyCharacter.toUpperCase()} LOST!! <br>`;
                        attackButton.style.display = 'none';
                        defendButton.style.display = 'none';
                        //ultbutton is removed on display()
                        gameOver = true;
                    } 

                    isPUltimating= false; //sets this to false when done ultimating
                }

                isPAttacking=false;
                isPDefending = false;
                isEAttacking = false;
                isEDefending= false;

                display();
                
            }

            function chooseAImove()
            {
                let aiMove = Math.floor((Math.random()*2)+1); //random between attack or defend
                if (Math.floor(eFa/pFa)>=2 || pFa < 0)//checks if ult conditions are met
                {
                    isEUltimating = true;
                }
                else if (aiMove === 1)
                {
                    isEAttacking = true;
                }
                else
                {
                    isEDefending= true;
                }
            }


            