import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import CreateRoadmap from "@/components/modals/CreateRoadmap";
const Home = () => {
  // const navigate = useNavigate()
  // // const handleClick = () => {
  // //   navigate('draw-roadmap')
  // // }
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const combinedText =
    "roadmapPro is a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings.";

  return (
    <div className="min-h-96 items-center flex justify-between">
      <div className=" mt-7 sm-mt-12  ms-[12%] max-w-[80%] sm:max-w-[50%]">
        <p className="text-5xl sm:text-6xl font-extrabold text-black dark:text-white">
          Developer
          <br /> Roadmap & Mentors
        </p>

        <motion.p
          className="mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          {combinedText.split(" ").map((el, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.55,
                delay: i / 10,
              }}
            >
              {el}{" "}
            </motion.span>
          ))}
        </motion.p>
        <Button
          variant={"default"}
          className="dark:bg-white font-bold dark:text-black mt-5 rounded-lg tracking-normal"
          onClick={openDialog}
        >
          Create your own roadmap
        </Button>
      </div>
      <div></div>
        <CreateRoadmap dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
};

export default Home;
