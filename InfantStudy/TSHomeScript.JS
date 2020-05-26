// Set up variables to store data later written to a file
var subjectNumber;
var testDate;
var experimenter;
var conditionNumber = 2;
var truePassword = "turkeyjuly";

// This function handles the submit button by assigning variables and checking for proper input then moves
// to the next page if everything is correct

function submit()
{
    var userPassword = $("#password").val();
    subjectNumber = $("#subNumber").val();
    testDate = $("#testDate").val();
    experimenter = $("#experimenter").val();
    conditionNumber = $("#conditionNumber").val();
    
    if(subjectNumber == null || subjectNumber == "")
        {
            alert("No subject number was entered!")
        }
    if(testDate == null || testDate == "")
        {
            alert("No test date was entered!")
        }
    if(experimenter == null || experimenter == "")
        {
            alert("No expermenter name was entered!")
        }
    if(conditionNumber == null || conditionNumber == "" || conditionNumber <= 0 || conditionNumber > 4)
        {
            alert("No condition number was entered!")
        }
    if(userPassword !== truePassword || userPassword == null || userPassword == "")
        {
            alert("Password is incorrect, try again!")
        }
    else
    {
        location.href = "ExperimentalPage.html";
    }
}


// this code is for the experiment page

// Setting up variables for scenes and click counting
var sceneNumber = 0;
var greenClicks = 0;
var orangeClicks = 0;
var leftClicks = 0;
var rightClicks = 0;
var leftButton = 0;

// this function changes scenes according to keyboard input (space to move foreward, B to move backwards)

function changeScene() {
    if(sceneNumber == 0)
        {
            sceneOne();
        }
    if(sceneNumber == 1)
        {
            sceneTwo();
        }
    if(sceneNumber == 2)
        {
            sceneThree();
        }
    if(sceneNumber == 3)
        {
            sceneOne();
        }
    if(sceneNumber == 4)
        {
            sceneTwo();
        }
    if(sceneNumber == 5)
        {
            sceneThree();
        }
    if(sceneNumber == 6)
        {
            sceneFour();
        }
    if(sceneNumber == 7)
        {
            sceneFive();
        }
    if(sceneNumber == 8)
        {
            sceneSix();
        }
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        if(sceneNumber >= 0 && sceneNumber < 8) {
            sceneNumber ++;
            changeScene();     
        }
    }
    if(event.keyCode == 66) {
        if (sceneNumber <= 8 && sceneNumber > 0) {
            sceneNumber --;
            changeScene();
        }
    }
});

// Below are the scenes for each slide for training and test purposes
function sceneOne()
{
            $(".rightBox").attr("onclick", "playTrainingRewardVideo()");
            $(".rightBox").show();
            $(".leftBox").hide();
}

function sceneTwo()
{
            $(".leftBox").attr("onclick", "playTrainingPunishVideo()");
            $(".rightBox").hide();
            $(".leftBox").show();
}

function sceneThree()
{
    $(".leftBox").show();
    $(".rightBox").show();
    $(".vid > source").attr("src", "Training_punish.mp4")
    $(".vid").load();
    $(".leftBox").attr("onclick", "playTrainingPunishVideo()");
    $(".rightBox").attr("onclick", "playTrainingRewardVideo()");
    
}

function sceneFour()
{
    $(".leftBox").hide();
    $(".rightBox").hide();
    playBlockVideo();
}

function sceneFive()
{
    $(".leftBox").hide();
    $(".rightBox").hide();
    playRipVideo();
}

function sceneSix()
{
    checkCondition();
    disableButtons();
    setTimeout(sceneSeven, 5000);
}

function sceneSeven()
{
    enableButtons();
    setTimeout(blankScreen, 90000);
    setTimeout(whatIsClicked, 10000);
}

// These are all the diferent play video functions
function playTrainingRewardVideo()
{
    $(".vid > source").attr("src", "Training_Reward.mp4");
    $(".vid").load();
    $(".vid").trigger('play');   
}

function playTrainingPunishVideo()
{
    $(".vid > source").attr("src", "Training_Punish.mp4");
    $(".vid").load();
    $(".vid").trigger('play');
}

function playTestPunish()
{
    $(".vid > source").attr("src", "Test_punish.mp4");
    $(".vid").load();
    $(".vid").trigger('play');
}
function playTestReward()
{
    $(".vid > source").attr("src", "Test_reward.mp4");
    $(".vid").load();
    $(".vid").trigger('play');
}
function playRipVideo()
{
    $(".vid > source").attr("src", "RipPicture1.mp4")
    $(".vid").load();
    $(".vid").trigger('play');
}

function playBlockVideo()
{
    $(".vid > source").attr("src", "Blockgoal1.mp4")
    $(".vid").load();
    $(".vid").trigger('play');
}

// this checks condition number and sets up the test phase accordingly
function checkCondition()
{
    $(".leftBox").show();
    $(".rightBox").show();
    $(".vid > source").attr("src", "Test_reward.mp4");
    $(".vid").load();
    if(conditionNumber == 1)
        {
            $(".rightBox").css("background-color", "rgb(247,148,29)");
            $(".leftBox").css("background-color", "rgb(141,198,63)");
            $(".rightBox").attr("onclick", "playTestPunish()");
            $(".leftBox").attr("onclick", "playTestReward()");  
            leftButton = 0;
        }
    if(conditionNumber == 2)
        {
            $(".rightBox").css("background-color", "rgb(141,198,63)");
            $(".leftBox").css("background-color", "rgb(247,148,29)");
            $(".leftBox").attr("onclick", "playTestPunish()");
            $(".rightBox").attr("onclick", "playTestReward()");
            leftButton = 1;
        }
    if(conditionNumber == 3)
        {
            $(".leftBox").css("background-color", "rgb(247,148,29)");
            $(".rightBox").css("background-color", "rgb(141,198,63)");
            $(".rightBox").attr("onclick", "playTestPunish()");
            $(".leftBox").attr("onclick", "playTestReward()");
            leftButton = 1;
        }
    if(conditionNumber == 4)
        {
            $(".rightBox").css("background-color", "rgb(247,148,29)");
            $(".leftBox").css("background-color", "rgb(141,198,63)");
            $(".rightBox").attr("onclick", "playTestReward()");
            $(".leftBox").attr("onclick", "playTestPunish()");
            leftButton = 0;
        }
}

// functions for counting/screen timeouts/button color check
function countLeftClicks()
{
    leftClicks ++;
}
function countRightClicks()
{
    rightClicks ++;
}
function blankScreen()
{
    $(".leftBox").hide();
    $(".rightBox").hide();
    $(".midBox").hide();
}
function disableButtons()
{
    $(".leftBox").attr("onclick", "");
    $(".rightBox").attr("onclick", "");
}
function enableButtons()
{
    $(".leftBox").attr("onclick", "countLeftClicks()");
    $(".rightBox").attr("onclick", "countRightClicks()");
}
// checks to see what color has been clicked and assigns to the color variables
function whatIsClicked()
{
    if(leftButton == 0)
        {
            greenClicks = leftClicks;
            orangeClicks = rightClicks;
        }
    else
    {
        orangeClicks = leftClicks;
        greenClicks = rightClicks;
    }
    alert("green is " + greenClicks);
    alert("orange is " + orangeClicks);
}
