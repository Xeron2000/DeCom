// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CommentSystem {
    struct Comment {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
    }

    mapping(string => Comment[]) private topicComments;

    event CommentPosted(
        string indexed topic,
        address indexed author,
        string content,
        uint256 timestamp
    );

    function postComment(string memory _topic, string memory _content) public {
        Comment[] storage comments = topicComments[_topic];
        uint256 commentId = comments.length;

        comments.push(Comment({
            id: commentId,
            author: msg.sender,
            content: _content,
            timestamp: block.timestamp
        }));

        emit CommentPosted(_topic, msg.sender, _content, block.timestamp);
    }

    function getComments(string memory _topic) public view returns (Comment[] memory) {
        return topicComments[_topic];
    }
}
