                let kImage = document.getElementById("kafkaImage");
                let lImage = document.getElementById("linkImage");
                let playbtn = document.getElementById("start");
                chosenImg = ""; //player image
                enemyC = "";

                function changeBorderK()
                {
                    kImage.style.border = "solid 5px rgb(217, 100, 100)";
                    chosenImg = "kafka"
                    enemyC = "link"
                    lImage.style.border = "solid 5px transparent";
                }

                function changeBorderL()
                {
                    lImage.style.border = "solid 5px rgb(217, 100, 100)";
                    chosenImg = "link";
                    enemyC = "kafka"
                    kImage.style.border = "solid 5px transparent";
                }

                function buttonClicked()
                {
                    localStorage.setItem('playerCharacter',chosenImg);
                    localStorage.setItem('enemyCharcater', enemyC);
                }

                kImage.addEventListener("click",changeBorderK);
                lImage.addEventListener("click",changeBorderL);
                playbtn.addEventListener("click",buttonClicked);
