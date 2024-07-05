from dotenv import load_dotenv

load_dotenv()

from flask import jsonify, request
from app.utils.success import Success
from app.utils.error import Error
import sys, os

sys.dont_write_bytecode = True


def check():
    return Success("success", "Hello World")
