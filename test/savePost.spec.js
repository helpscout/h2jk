import { readPost } from './helpers';
import savePost from '../src/savePost';
import mapDataToProps from '../src/mapDataToProps';
import data from './fixture/post';

const dir = './test-dir';

describe('savePost', () => {
  it("should return false if dir argument isn't valid", () => {
    expect(savePost(123)(data)).to.be.false;
  });

  it('should return false if post is invalid', () => {
    expect(savePost(dir)({})).to.be.false;
    expect(savePost(dir)()).to.be.false;
    expect(savePost(dir)('postttttttttt')).to.be.false;
  });

  it('should resolve promise if post is valid', () => {
    expect(savePost(dir)(data)).to.be.fulfilled;
  });

  it('should output .md file into default dir', done => {
    savePost()(data)
      .then(() => {
        const postProps = mapDataToProps(data);
        const post = readPost('./posts')(postProps);

        expect(post).to.exist;
        expect(post).to.be.a('string');

        expect(post).to.contain(postProps.front_matter.title);
        expect(post).to.contain(postProps.front_matter.description);
        expect(post).to.contain(postProps.content);

        done();
      })
      .catch(err => {
        done(err);
      });
  });
});