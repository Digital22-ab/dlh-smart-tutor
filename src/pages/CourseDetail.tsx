import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, MessageSquare, Clock, Users, Star, CheckCircle } from "lucide-react";
import { DLH_COURSES } from "@/lib/courses";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = DLH_COURSES.find((c) => c.id === courseId);

  if (!course) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <BookOpen className="mx-auto mb-4 text-muted-foreground" size={48} />
          <h2 className="text-xl font-semibold mb-2">Course not found</h2>
          <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/courses")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Hero */}
          <div className="aspect-video rounded-2xl overflow-hidden bg-muted mb-8">
            <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-gradient-primary text-primary-foreground">{course.category}</Badge>
            <div className="flex items-center gap-1 text-dlh-warning">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-medium">4.8</span>
            </div>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock size={14} />Self-paced</span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Users size={14} />Open Enrollment</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-muted-foreground mb-8">{course.description}</p>

          {/* Topics */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">What You'll Learn</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {course.topics.map((topic) => (
                <div key={topic} className="flex items-center gap-3">
                  <CheckCircle className="text-dlh-teal flex-shrink-0" size={18} />
                  <span className="text-sm">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 flex-1"
              onClick={() => navigate(`/chat?course=${course.id}`)}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Learning with AI Tutor
            </Button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
