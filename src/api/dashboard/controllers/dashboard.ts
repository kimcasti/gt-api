import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::dashboard.dashboard",
  ({ strapi }) => ({
    async find(ctx) {
      // Obtener datos agregados de proyectos y tareas
      const projects = await strapi.entityService.findMany(
        "api::project.project"
      );
      const tasks = await strapi.entityService.findMany("api::task.task");

      // Estadísticas según los estados reales
      const stats = {
        totalProjects: projects.length,
        totalTasks: tasks.length,
        tareasPorHacer: tasks.filter((t) => t.status === "Por hacer").length,
        tareasEnProgreso: tasks.filter((t) => t.status === "En progreso")
          .length,
        tareasBloqueadas: tasks.filter((t) => t.status === "Bloqueada").length,
        tareasCompletadas: tasks.filter((t) => t.status === "Completada")
          .length,
      };

      ctx.body = {
        stats,
        projects,
        tasks,
      };
    },
  })
);
