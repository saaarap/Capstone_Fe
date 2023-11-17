import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/Main";
import AxiosClient from "../clients/clients";
import PostCard from "../components/PostsCard";
import AddPostModal from "../components/AddModalPost";
import { Pagination } from "flowbite-react";
import { useUser } from "../components/UserContext";
const client = new AxiosClient();

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loggedInUser } = useUser();
  const [sortBy, setSortBy] = useState("createdAt:desc");

  const getPosts = async (page) => {
    try {
      const response = await client.get(`/posts?page=${page}&sortBy=${sortBy}`);

      setPosts(response.posts);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await client.delete(`/posts/delete/${postId}`);
      const updatedPosts = posts.filter((post) => post._id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <MainLayout>
      <div className="flex items-center justify-center">
        {isModalOpen && <AddPostModal close={toggleModal} />}

        <svg
          className="w-6 h-6 text-white bg-gray-900 rounded cursor-pointer p-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
          onClick={toggleModal}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </div>
      <div className="w-100 flex gap-3 flex-wrap p-2">
        {posts.map((post) => (
          <div key={post._id}>
            <PostCard
              postId={post._id}
              title={post.title}
              cover={post.cover}
              content={post.content}
              author={post.author?.userName}
              authorAvatar={post.author?.avatar}
              onDelete={handleDeletePost}
              onUpdate={() => getPosts(currentPage)}
              loggedInUser={loggedInUser}
            />
          </div>
        ))}
      </div>
      <div className="flex overflow-x-auto justify-center">
        <Pagination
          layout="navigation"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </MainLayout>
  );
};

export default Home;
