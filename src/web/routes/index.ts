import { Request, Response } from "express";
import { body, param, query } from "express-validator";
import {
  checkUserPermission,
  checkUserPermissions,
} from "./utils/CheckUserPermissionMiddleware.js";

import ApplicationController from "../../controllers/ApplicationController.js";
import BuildTeamController from "../../controllers/BuildTeamController.js";
import ClaimController from "../../controllers/ClaimController.js";
import ContactController from "../../controllers/ContactController.js";
import FaqController from "../../controllers/FAQController.js";
import GeneralController from "../../controllers/GeneralController.js";
import { Keycloak } from "keycloak-connect";
import NewsletterController from "../../controllers/NewsletterController.js";
import { RequestMethods } from "./utils/RequestMethods.js";
import Router from "./utils/Router.js";
import ShowcaseController from "../../controllers/ShowcaseController.js";
import UserController from "../../controllers/UserController.js";
import Web from "../Web.js";

class Routes {
  app;

  web: Web;

  keycloak: Keycloak;

  constructor(web: Web) {
    web.getCore().getLogger().info("Registering API routes");
    this.web = web;
    this.app = web.getApp();
    this.keycloak = this.web.getKeycloak();
    this.registerRoutes();
  }

  private registerRoutes() {
    const legacyRouter: Router = new Router(this.web, "");
    const router: Router = new Router(this.web, "v1");

    const buildTeamController = new BuildTeamController(this.web.getCore());
    const showcaseController = new ShowcaseController(this.web.getCore());
    const applicationController = new ApplicationController(this.web.getCore());
    const claimController = new ClaimController(this.web.getCore());
    const faqController = new FaqController(this.web.getCore());
    const userController = new UserController(this.web.getCore());
    const contactController = new ContactController(this.web.getCore());
    const newsletterController = new NewsletterController(this.web.getCore());
    const generalController = new GeneralController(this.web.getCore());

    legacyRouter.addRoute(
      RequestMethods.GET,
      "modpack/images",
      (request, response) => {
        response.send({
          "1": {
            url: "https://i.imgur.com/N5cplwx.jpeg",
            credit: "waggiswagen#2266, Knäggi#4895 render: jo_kil#1977",
          },
          "2": {
            url: "https://i.imgur.com/tGtWJGk.jpeg",
            credit: "Woesh3#1155",
          },
          "3": {
            url: "https://i.imgur.com/yxEWCdQ.jpeg",
            credit: "Juancy23#9223",
          },
          "4": {
            url: "https://i.imgur.com/yQjMRlr.jpeg",
            credit:
              "Leander#2813, Grischbrei#6173, Norwod#9035 & DasBirnenDing#1574",
          },
          "5": {
            url: "https://i.imgur.com/9zqFHxa.png",
            credit:
              "Schnieven#0083, XilefHD#7198, copac#6194, render: XilefHD#7198",
          },
          logo: { url: "https://i.imgur.com/ih6BF72.png", credit: null },
        });
      }
    );

    router.addRoute(RequestMethods.GET, "/healthcheck", (request, response) => {
      response.send({ status: "up" });
    });
    router.addRoute(
      RequestMethods.GET,
      "/account",
      async (request, response) => {
        await generalController.getAccount(request, response);
      },
      checkUserPermission(this.web.getCore().getPrisma(), "account.info")
    );
    router.addRoute(
      RequestMethods.GET,
      "/permissions",
      async (request, response) => {
        await generalController.getPermissions(request, response);
      }
    );
    router.addRoute(
      RequestMethods.POST,
      "/upload",
      async (request, response) => {
        await generalController.uploadImage(request, response);
      },
      this.web.getFileUpload().single("image")
    );

    /*
     *
     * Build Team Routes
     *
     */

    router.addRoute(
      RequestMethods.GET,
      "/buildteams",
      async (request, response) => {
        await buildTeamController.getBuildTeams(request, response);
      },
      query("page").isNumeric().optional()
    );
    router.addRoute(
      RequestMethods.GET,
      "/buildteams/:id",
      async (request, response) => {
        await buildTeamController.getBuildTeam(request, response);
      },
      param("id").isUUID()
    );
    router.addRoute(
      RequestMethods.GET,
      "/buildteams/:id/application/questions",
      async (request: Request, response: Response) => {
        await buildTeamController.getBuildTeamApplicationQuestions(
          request,
          response
        );
      },
      param("id").isUUID()
    );
    router.addRoute(
      RequestMethods.POST,
      "/buildteams/:id/application/questions",
      async (request: Request, response: Response) => {
        await buildTeamController.updateBuildTeamApplicationQuestions(
          request,
          response
        );
      },
      param("id").isUUID(),
      body("questions"),
      checkUserPermission(
        this.web.getCore().getPrisma(),
        "team.application.edit",
        "id"
      )
    );
    router.addRoute(
      RequestMethods.GET,
      "/buildteams/:id/socials",
      async (request: Request, response: Response) => {
        await buildTeamController.getBuildTeamSocials(request, response);
      },
      param("id").isUUID()
    );
    router.addRoute(
      RequestMethods.POST,
      "/buildteams/:id/socials",
      async (request: Request, response: Response) => {
        await buildTeamController.updateBuildTeamSocials(request, response);
      },
      param("id").isUUID(),
      body("socials"),
      checkUserPermission(
        this.web.getCore().getPrisma(),
        "buildteam.socials.edit",
        "id"
      )
    );
    router.addRoute(
      RequestMethods.GET,
      "/buildteams/:id/members",
      async (request: Request, response: Response) => {
        await buildTeamController.getBuildTeamMembers(request, response);
      },
      param("id").isUUID(),
      checkUserPermissions(
        this.web.getCore().getPrisma(),
        ["permissions.add", "permissions.remove"],
        "id"
      )
    );
    router.addRoute(
      RequestMethods.DELETE,
      "/buildteams/:id/members",
      async (request: Request, response: Response) => {
        await buildTeamController.removeBuildTeamMember(request, response);
      },
      param("id").isUUID(),
      body("user"),
      checkUserPermission(
        this.web.getCore().getPrisma(),
        "buildteam.members.edit",
        "id"
      )
    );
    router.addRoute(
      RequestMethods.GET,
      "/buildteams/:id/managers",
      async (request: Request, response: Response) => {
        await buildTeamController.getBuildTeamManagers(request, response);
      },
      param("id").isUUID(),
      checkUserPermissions(
        this.web.getCore().getPrisma(),
        ["permissions.add", "permissions.remove"],
        "id"
      )
    );
    router.addRoute(
      RequestMethods.POST,
      "/buildteams/:id",
      async (request: Request, response: Response) => {
        await buildTeamController.updateBuildTeam(request, response);
      },
      param("id").isUUID(),
      body("name").isString().optional(),
      body("icon").isURL().optional(),
      body("backgroundImage").isURL().optional(),
      body("invite").isURL().optional(),
      body("about").isString().optional(),
      body("location").isString().optional(),
      body("slug").isString().optional(),
      checkUserPermission(
        this.web.getCore().getPrisma(),
        "buildteam.settings.edit",
        "id"
      )
    );

    /*
     *
     * Claim Routes
     *
     */

    router.addRoute(
      RequestMethods.GET,
      "/claims",
      async (request, response) => {
        await claimController.getClaims(request, response);
      }
    );
    router.addRoute(
      RequestMethods.GET,
      "/claims/geojson",
      async (request, response) => {
        await claimController.getClaimsGeoJson(request, response);
      }
    );
    router.addRoute(
      RequestMethods.GET,
      "/claims/:id",
      async (request, response) => {
        await claimController.getClaim(request, response);
      },
      param("id").isUUID()
    );

    /*
     *
     * Showcase Routes
     *
     */

    router.addRoute(
      RequestMethods.GET,
      "/buildteams/:id/showcases",
      async (request, response) => {
        await showcaseController.getShowcases(request, response);
      },
      param("id").isUUID()
    );
    router.addRoute(
      RequestMethods.GET,
      "/showcases",
      async (request, response) => {
        await showcaseController.getAllShowcases(request, response);
      }
    );
    router.addRoute(
      RequestMethods.GET,
      "/showcases/random",
      async (request, response) => {
        await showcaseController.getRandomShowcases(request, response);
      },
      query("limit").isNumeric()
    );
    router.addRoute(
      RequestMethods.DELETE,
      "/buildteams/:team/showcases/:id",
      async (request, response) => {
        await showcaseController.deleteShowcase(request, response);
      },
      param("id").isUUID(),
      checkUserPermission(
        this.web.getCore().getPrisma(),
        "team.showcases.edit",
        "team"
      )
    );
    router.addRoute(
      RequestMethods.POST,
      "/buildteams/:id/showcases",
      async (request, response) => {
        await showcaseController.createShowcase(request, response);
      },
      param("id").isUUID(),
      checkUserPermission(
        this.web.getCore().getPrisma(),
        "team.showcases.edit",
        "team"
      ),
      this.web.getFileUpload().single("image")
    );

    /*
     *
     * Application Routes
     *
     */

    // TODO: Redo
    router.addRoute(
      RequestMethods.GET,
      "/applications",
      async (request, response) => {
        await applicationController.getApplications(request, response);
      },
      query("page").isNumeric().optional(),
      query("includeBuildteam").isBoolean().optional(),
      query("includeReviewer").isBoolean().optional(),
      query("includeAnswers").isBoolean().optional(),
      query("buildteam").isUUID().optional()
      // Permission check later
    );
    router.addRoute(
      RequestMethods.POST,
      "/applications",
      async (request, response) => {
        await applicationController.apply(request, response);
      }
    );
    router.addRoute(
      RequestMethods.GET,
      "/applications/:id",
      async (request, response) => {
        await applicationController.getApplication(request, response);
      },
      param("id").isUUID(),
      query("includeBuildteam").isBoolean().optional(),
      query("includeReviewer").isBoolean().optional(),
      query("includeAnswers").isBoolean().optional()
      // Permission check later
    );
    router.addRoute(
      RequestMethods.POST,
      "/applications/:id",
      async (request, response) => {
        await applicationController.review(request, response);
      },
      param("id").isUUID(),
      body("isTrial").isBoolean(),
      body("claimActive").isBoolean(),
      body("status").isIn(["reviewing", "accepted", "declined"]),
      body("reason").isString().optional()
    );

    /*
     *
     * FAQ Routes
     *
     */

    router.addRoute(
      RequestMethods.GET,
      "/faq",
      async (request, response) => {
        await faqController.getFaqQuestions(request, response);
      },
      query("page").isNumeric().optional()
    );
    router.addRoute(
      RequestMethods.POST,
      "/faq",
      async (request, response) => {
        await faqController.addFaqQuestion(request, response);
      },
      body("question"),
      body("answer"),
      checkUserPermission(this.web.getCore().getPrisma(), "faq.add")
    );
    router.addRoute(
      RequestMethods.POST,
      "/faq/:id",
      async (request, response) => {
        await faqController.editFaqQuestion(request, response);
      },
      param("id").isUUID(),
      body("answer").isString().optional(),
      body("question").isString().optional(),
      body("links").isArray().optional(),
      checkUserPermission(this.web.getCore().getPrisma(), "faq.edit")
    );
    router.addRoute(
      RequestMethods.DELETE,
      "/faq/:id",
      async (request, response) => {
        await faqController.deleteFaqQuestions(request, response);
      },
      param("id").isUUID(),
      checkUserPermission(this.web.getCore().getPrisma(), "faq.remove")
    );

    /*
     *
     * User Routes
     *
     */

    router.addRoute(
      RequestMethods.GET,
      "/users",
      async (request, response) => {
        await userController.getUsers(request, response);
      },
      query("page").isNumeric().optional(),
      checkUserPermission(this.web.getCore().getPrisma(), "users.list")
    );
    router.addRoute(
      RequestMethods.GET,
      "/users/:id/permissions",
      async (request, response) => {
        await userController.getPermissions(request, response);
      },
      param("id"),
      checkUserPermission(this.web.getCore().getPrisma(), "users.list")
    );
    router.addRoute(
      RequestMethods.POST,
      "/users/:id/permissions",
      async (request, response) => {
        await userController.addPermission(request, response);
      },
      param("id"),
      body("permission").isString().optional(),
      body("permissions").isArray().optional(),
      query("buildteam").isString().optional()
      // Permission check later: permissions.add
    );
    router.addRoute(
      RequestMethods.DELETE,
      "/users/:id/permissions",
      async (request, response) => {
        await userController.removePermission(request, response);
      },
      param("id"),
      body("permission").isString().optional(),
      body("permissions").isArray().optional(),
      query("buildteam").isString().optional()
      // Permission check later: permissions.remove
    );

    /*
     *
     * Contact Routes
     *
     */
    router.addRoute(
      RequestMethods.GET,
      "/contacts",
      async (request, response) => {
        await contactController.getContacts(request, response);
      }
    );
    router.addRoute(
      RequestMethods.POST,
      "/contacts",
      async (request, response) => {
        await faqController.addFaqQuestion(request, response);
      },
      body("name"),
      body("role"),
      body("discord").optional(),
      body("email").isEmail().optional(),
      body("avatar").isURL().optional(),
      checkUserPermission(this.web.getCore().getPrisma(), "contacts.add")
    );
    router.addRoute(
      RequestMethods.POST,
      "/contacts/:id",
      async (request, response) => {
        await faqController.editFaqQuestion(request, response);
      },
      param("id").isUUID(),
      body("name").optional(),
      body("role").optional(),
      body("discord").optional(),
      body("email").isEmail().optional(),
      body("avatar").isURL().optional(),
      checkUserPermission(this.web.getCore().getPrisma(), "contacts.edit")
    );

    /*
     *
     * Newsletter Routes
     *
     */
    router.addRoute(
      RequestMethods.GET,
      "/newsletter",
      async (request, response) => {
        await newsletterController.getNewsletters(request, response);
      },
      param("page").optional()
    );
    router.addRoute(
      RequestMethods.GET,
      "/newsletter/:id",
      async (request, response) => {
        await newsletterController.getNewsletter(request, response);
      },
      param("id").optional(),
      query("isIssue").optional()
    );
    router.addRoute(
      RequestMethods.POST,
      "/newsletter",
      async (request, response) => {
        await newsletterController.addNewsletter(request, response);
      },
      param("public").isBoolean().optional(),
      checkUserPermission(this.web.getCore().getPrisma(), "newsletter.add")
    );
  }
}

export default Routes;
