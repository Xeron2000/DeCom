// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CommentSystem {
    struct Comment {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
    }

    mapping(string => Comment[]) private topicComments;
    mapping(uint256 => mapping(address => bool)) public commentLikes; // commentId -> liker -> hasLiked

    event CommentPosted(
        string indexed topic,
        address indexed author,
        string content,
        uint256 timestamp
    );

    event CommentLiked(
        string indexed topic,
        uint256 indexed commentId,
        address indexed liker,
        uint256 newLikeCount
    );

    function postComment(string memory _topic, string memory _content) public {
        Comment[] storage comments = topicComments[_topic];
        uint256 commentId = comments.length;

        comments.push(Comment({
            id: commentId,
            author: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            likes: 0
        }));

        emit CommentPosted(_topic, msg.sender, _content, block.timestamp);
    }

    function likeComment(string memory _topic, uint256 _commentId) public {
        Comment[] storage comments = topicComments[_topic];
        require(_commentId < comments.length, "Comment does not exist");
        require(!commentLikes[_commentId][msg.sender], "Already liked");

        commentLikes[_commentId][msg.sender] = true;
        comments[_commentId].likes += 1;

        emit CommentLiked(_topic, _commentId, msg.sender, comments[_commentId].likes);
    }

    function getComments(string memory _topic) public view returns (Comment[] memory) {
        return topicComments[_topic];
    }
}
