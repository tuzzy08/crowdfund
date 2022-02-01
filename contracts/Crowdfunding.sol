// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Token.sol";

contract Crowdfunding is Ownable, ReentrancyGuard  {
    using Counters for Counters.Counter;
    Counters.Counter private _projectId;
    Counters.Counter private _projectsCompleted;
    Token _crowdToken;
    uint _listingFee = 0.025 ether;

    struct Project {
        uint projectID;
        uint projectGoal;
        uint balance;
        uint funders;
        string title;
        string description;
        address payable owner;
        bool isComplete;
        bool isClosed;
    }

    mapping (address => uint256) userIDtoProjectID;
    mapping (uint256 => Project) projectIDtoProject;
    mapping (address => uint) userTokenBalance;

    event ProjectCreated (
        uint projectID,
        uint projectGoal,
        uint balance,
        string title,
        string description,
        address owner,
        bool isComplete,
        bool isClosed
    );

    event TokenTransferred (
        address receiver,
        uint amountTransferred,
        uint userTokenBalance
    );

    event ProjectFunded (
        uint256 projectID,
        uint256 amount,
        address paidBy
    );

    constructor() payable {
        _crowdToken = new Token();
    }
    // Get address of CROWD Token contract
    function getTokenContractAddress() public view returns(address tokenContract) {
        return address(_crowdToken);
    }
    // Transfer CROWD Token to an address
    function transferToken(address receiver, uint amount) private nonReentrant onlyOwner returns(bool) {
        // Check if contract has enough tokens for transfer
        require(address(this).balance >= amount, 'Not enough tokens for this transfer');
        // Check for integer overflow
        require(userTokenBalance[receiver] + amount >= userTokenBalance[receiver]);
        // Update user token balance
        userTokenBalance[receiver] += amount;
        // Transfer token to user
        _crowdToken.transfer(receiver, amount);
        // Emit transfer event
        emit TokenTransferred(receiver, amount, userTokenBalance[receiver]);
        return true;
    }
    

    function getListingFee() public view returns(uint) {
        return _listingFee;
    }

    // Create a new project
    function createProject(
        string memory title,
        string memory description, 
        uint projectGoal
        ) public payable {
            require(msg.value == _listingFee, "Amount provided not equal to listing fee");
            _projectId.increment();
            uint projectID = _projectId.current();
            userIDtoProjectID[msg.sender] = projectID;
            projectIDtoProject[projectID] = Project(
                projectID,
                projectGoal,
                0,
                0,
                title,
                description,
                payable (msg.sender),
                false,
                false
            );
            // Emit Project Creation event
            emit ProjectCreated(
                projectID,
                projectGoal,
                0,
                title,
                description,
                payable (msg.sender),
                false,
                false
            );
    }
    // Fund a project
    function fundProject(uint256 projectID) external payable returns (bool) {
        // Check that the function call hass funds attached to it
        require(msg.value > 0, "You must fund an amount greater than zero");
        // Check that the project isn't marked as closed or completed
        require(!projectIDtoProject[projectID].isClosed && !projectIDtoProject[projectID].isComplete);
        // Update project balance
        projectIDtoProject[projectID].balance += msg.value;
        // Update number of funders
        projectIDtoProject[projectID].funders += 1;
        // Transfer token to address
        transferToken(msg.sender, 1000000000000000000);
        // Emit funding event
        emit ProjectFunded(projectID, msg.value, msg.sender);
        return true;
    }
    // Fetch all created projects
    function fetchAllProjects() public view returns(Project[] memory) {
        // Get total number of projects listed
        uint256 totalNumberOfProjects = _projectId.current();
        // Get total number of uncompleted projects
        uint256 totalUncompletedProjects = totalNumberOfProjects - _projectsCompleted.current();
        uint currentIndex = 0;
        // Initialize an array with the size of uncompleted projects
        Project[] memory availableProjects = new Project[](totalUncompletedProjects);
        // Loop through all the projects and filter out completed projects
        for (uint i=0; i < totalNumberOfProjects; i++) {
            if (projectIDtoProject[i + 1].isComplete == false && projectIDtoProject[i + 1].isClosed == false) {
                // Get current project ID
                uint256 currentItemID = projectIDtoProject[i + 1].projectID;
                // Retrieve project from the ID
                Project storage currentProject = projectIDtoProject[currentItemID];
                // Store project in the array
                availableProjects[currentIndex] = currentProject;
                // Update index of array
                currentIndex += 1;
            }            
        }
        return availableProjects;
    }
    // Set a project as completed
    function markProjectComplete(uint projectID) public nonReentrant onlyOwner returns(bool) {
        // Fetch the project using it's ID
        Project storage currentProject = projectIDtoProject[projectID];
        // Check that this contract has enough funds to send
        require(address(this).balance > 0, 'Insufficient funds in contract');
        // Check that the project goal has been reached
        require(currentProject.projectGoal >= currentProject.balance, "Project funding goal hasn't been reached.");
        // Check that the project isn't marked as closed or completed
        require(!currentProject.isClosed && !currentProject.isComplete);
        // Reset the project balance
        currentProject.balance = 0;
        // Mark project as complete        
        currentProject.isComplete = true;
        // Transfer the project funds to the address of it's owner
        currentProject.owner.transfer(currentProject.balance);
        return true;
    }
    // Close project that didn't meet goal or that needs to be closed
    function closeProjectAndTransferBalance(uint256 projectID) public onlyOwner nonReentrant returns(bool) {
        // Fetch the project using it's ID
        Project storage currentProject = projectIDtoProject[projectID];
        // Check that this contract has enough funds to send
        require(address(this).balance > 0, 'Insufficient funds in contract');
        // Check that contract has some balance and is not already completed or closed
        require(currentProject.balance > 0, 'Not enough funds for this transfer');
        require(!currentProject.isClosed && !currentProject.isComplete);
        // Reset contract balance and mark as closed
        currentProject.balance = 0;
        currentProject.isClosed = true;
        // Transfer balance to project owner's address
        currentProject.owner.transfer(currentProject.balance);   
        return true;
    }
    // Fetch a project by its ID
    function fetchProjectByID(uint256 projectId) public view returns (Project memory){
    return projectIDtoProject[projectId];
    }
    // Utility function to get balance of this contract
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
}