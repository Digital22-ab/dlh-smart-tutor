import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  BookOpen,
  Clock,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  created_at: string;
}

// Sample courses since we don't have real data yet
const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Mathematics",
    description: "Master the fundamentals of algebra, geometry, and calculus with our comprehensive course.",
    category: "Mathematics",
    image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Physics Fundamentals",
    description: "Explore the laws of motion, energy, and forces that govern our universe.",
    category: "Science",
    image_url: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "English Literature",
    description: "Dive into classic and contemporary works of literature and improve your analytical skills.",
    category: "Language",
    image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Computer Science Basics",
    description: "Learn programming concepts, algorithms, and computational thinking.",
    category: "Technology",
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "World History",
    description: "Journey through time and explore the events that shaped our world.",
    category: "History",
    image_url: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Chemistry Essentials",
    description: "Understand chemical reactions, periodic table, and molecular structures.",
    category: "Science",
    image_url: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=400",
    created_at: new Date().toISOString(),
  },
];

const categories = ["All", "Mathematics", "Science", "Language", "Technology", "History"];

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setCourses(data);
      }
    } catch (error) {
      console.error("Error loading courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Course Library</h1>
          <p className="text-muted-foreground">
            Explore our collection of courses across various subjects
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="pl-10 input-focus"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-primary hover:opacity-90"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="dlh-card-hover overflow-hidden group"
            >
              <div className="aspect-video overflow-hidden bg-muted relative">
                {course.image_url ? (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="text-muted-foreground" size={48} />
                  </div>
                )}
                <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground">
                  {course.category}
                </Badge>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      8 hours
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      1.2k
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-dlh-warning">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gradient-primary hover:opacity-90">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-muted-foreground">No courses found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
