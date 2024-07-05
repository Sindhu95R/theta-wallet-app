import sys

from app.utils.error import Error

sys.dont_write_bytecode = True

from flask import Blueprint

from app.controllers.admin import check


admin = Blueprint("admin", __name__)


admin.route("/check", methods=["GET"])(check)
