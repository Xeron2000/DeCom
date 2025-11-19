const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("CommentSystem", function () {
  let commentSystem;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const CommentSystem = await ethers.getContractFactory("CommentSystem");
    commentSystem = await CommentSystem.deploy();
  });

  it("Should post a comment", async function () {
    const topic = "test-topic";
    const content = "Hello World";

    await expect(commentSystem.postComment(topic, content))
      .to.emit(commentSystem, "CommentPosted")
      .withArgs(topic, owner.address, content, anyValue);

    const comments = await commentSystem.getComments(topic);
    expect(comments.length).to.equal(1);
    expect(comments[0].content).to.equal(content);
    expect(comments[0].likes).to.equal(0);
  });

  it("Should like a comment", async function () {
    const topic = "test-topic";
    const content = "Hello World";

    await commentSystem.postComment(topic, content);

    await expect(commentSystem.connect(addr1).likeComment(topic, 0))
      .to.emit(commentSystem, "CommentLiked")
      .withArgs(topic, 0, addr1.address, 1);

    const comments = await commentSystem.getComments(topic);
    expect(comments[0].likes).to.equal(1);
  });

  it("Should fail if liking twice", async function () {
    const topic = "test-topic";
    const content = "Hello World";

    await commentSystem.postComment(topic, content);
    await commentSystem.likeComment(topic, 0);

    await expect(commentSystem.likeComment(topic, 0))
      .to.be.revertedWith("Already liked");
  });
});

// Helper to get latest block timestamp if needed, though chai matchers handle it mostly
const time = {
  latest: async () => {
    const block = await ethers.provider.getBlock("latest");
    return block.timestamp;
  }
}
