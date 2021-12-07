// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract Crowdfunding is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _projectId;
    Counters.Counter private _projectsCompleted;

    address private _owner;
    Token private _crowdToken;

    uint listingFee = 1000000000000000000;

    struct Project {
        uint256 projectID;
        string title;
        string description;
        uint projectGoal;
        address payable owner;
        uint balance;
        bool isComplete;
    }

    mapping (address => uint256) userIDtoProjectID;
    mapping (uint256 => Project) projectIDtoProject;

    event ProjectCreated (
        uint256 projectID,
        string title,
        string description,
        uint projectGoal,
        address owner,
        uint balance,
        bool isComplete
    );

    event ProjectFunded (
        uint256 projectID,
        uint256 amount,
        address paidBy
    );

    constructor(Token crowdToken) payable {
        _crowdToken = crowdToken;
    }

    function createProject(
        string memory title,
        string memory description, 
        uint projectGoal
        ) public payable {
            require(msg.value == listingFee, "Amount provided not equal to listing fee");
            _projectId.increment();
            uint256 projectID = _projectId.current();
            userIDtoProjectID[msg.sender] = projectID;

            projectIDtoProject[projectID] = Project(
                projectID,
                title,
                description,
                projectGoal,
                payable (msg.sender),
                0,
                false
            );
            emit ProjectCreated(
                projectID,
                title,
                description,
                projectGoal,
                payable (msg.sender),
                0,
                false
            );
    }

    function fundProject(uint256 projectID) public payable returns (bool) {
        require(msg.value > 0, "You must fund an amount greater than zero");
        projectIDtoProject[projectID].balance += msg.value;
        emit ProjectFunded(projectID, msg.value, msg.sender);
        return true;
    }

    function fetchAllProjects() public view returns(Project[] memory) {
        uint256 totalNumberOfProjects = _projectId.current();
        uint256 totalUncompletedProjects = totalNumberOfProjects - _projectsCompleted.current();
        uint currentIndex = 0;

        Project[] memory availableProjects = new Project[](totalUncompletedProjects);
        for (uint i=0; i < totalNumberOfProjects; i++) {
            if (projectIDtoProject[i + 1].isComplete == false) {
                uint256 currentItemID = projectIDtoProject[i + 1].projectID;
                Project storage currentProject = projectIDtoProject[currentItemID];
                availableProjects[currentIndex] = currentProject;
                currentIndex += 1;
            }            
        }
        return availableProjects;
    }

    function markProjectComplete(address payable projectOwner) public onlyOwner returns(bool) {
        uint256 currentProjectID = userIDtoProjectID[projectOwner];
        Project storage currentProject = projectIDtoProject[currentProjectID];
        require(currentProject.projectGoal >= currentProject.balance, "Project funding goal hasn't been reached.");
        projectOwner.transfer(currentProject.balance);
        currentProject.isComplete = true;
        return true;
    }

    function closeProjectAndTransferBalance(uint256 projectID) public onlyOwner returns(bool) {
        Project storage currentProject = projectIDtoProject[projectID];
        if(currentProject.balance > 0) {
            currentProject.owner.transfer(currentProject.balance);
        }        
        currentProject.isComplete = true;
        return true;
    }

    function fetchProjectByID(uint256 projectId) public view returns (Project memory){
    return projectIDtoProject[projectId];
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
}